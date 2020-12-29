import { OrderStatus, PaymentStatus } from '../../infrastructure/helpers/SystemType'
import Order from '../../infrastructure/db/models/order'
import Axios from 'axios'

namespace OrderRepository {
    export const create = async() => {
        let order = await Order.query().insertAndFetch({
            status: OrderStatus.Created
        })
        let { data: {
            data
        } } = await Axios({
            method: `POST`,
            url: `http://localhost:8086/v1/app/payment`
        })
        data.status == PaymentStatus.Confirmed 
            ? await order.$query().update({
                payment_id: data.id,
                status: OrderStatus.Confirmed
            })
            : await order.$query().update({
                payment_id: data.id,
                status: OrderStatus.Cancelled
            })
        
        if(data.status == PaymentStatus.Confirmed)
            updateStatus(order.id)

        return order
    }

    const updateStatus = async(id: number) => {
        await sleep()
        await Order.query().findById(id).update({
            status: OrderStatus.Delivered
        })
    }

    const sleep = async() => {
        let ms = 10000
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default OrderRepository