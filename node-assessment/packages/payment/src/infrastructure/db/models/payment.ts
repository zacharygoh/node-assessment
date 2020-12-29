import { Model } from "objection"

export default class Payment extends Model {
    id: number
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
    
    static tableName = "payments"

    static get relationMappings() {
        const order = require('./order').default
        return {
            order: {
                relation: Model.HasOneRelation,
                modelClass: order,
                join: {
                    from: 'payments.id',
                    to: 'orders.payment_id'
                }
            }
        }
    }
}