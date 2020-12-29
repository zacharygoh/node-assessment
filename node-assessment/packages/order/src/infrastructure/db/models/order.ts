import { Model } from "objection"

export default class Order extends Model {
    id: number
    order_no: string
    status: string
    payment_id: number
    created_at: string
    updated_at: string
    deleted_at: string

    async $beforeInsert(){
        let { id } = await Order.query().orderBy('id', 'desc').first() || {}
        if (!id) {
            id = 1
        } else {
            id += 1
        }
        this.created_at = new Date().toISOString()
        this.updated_at = new Date().toISOString()
        this.order_no = `O${id.toString().padStart(6, '0')}`
    }
 
    $beforeUpdate(){
        this.updated_at = new Date().toISOString()
    }

    static tableName = "orders"

    static get relationMappings() {
        const payment = require('./payment').default
        return {
            payment: {
                relation: Model.BelongsToOneRelation,
                modelClass: payment,
                join: {
                    from: 'orders.payment_id',
                    to: 'orders.id'
                }
            }
        }
    }
}