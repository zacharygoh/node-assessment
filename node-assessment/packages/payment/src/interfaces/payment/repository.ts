import { OrderStatus, PaymentStatus } from '../../infrastructure/helpers/SystemType'
import Payment from '../../infrastructure/db/models/payment'
import _ from 'lodash'

namespace PaymentRepository {
    export const paymentProcess = async() => {
        let payment_status 
        switch(_.random(0, 1)) {
            case 1:
                payment_status = PaymentStatus.Confirmed
                break
            case 0:
                payment_status = PaymentStatus.Declined
                break
        }
        return await Payment.query().insertAndFetch({
            status: payment_status
        })
    }
}

export default PaymentRepository