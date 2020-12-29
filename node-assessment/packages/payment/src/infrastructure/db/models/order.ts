import { Model } from "objection"

export default class Order extends Model {
    id: number
    order_no: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string

    $beforeInsert(){
        this.created_at = new Date().toISOString()
        this.updated_at = new Date().toISOString()
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