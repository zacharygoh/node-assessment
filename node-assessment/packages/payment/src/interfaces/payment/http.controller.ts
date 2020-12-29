import { JsonController, Param, Body, Get, Post, HttpCode, Res, Req } from "routing-controllers"
import PaymentRepository from "./repository"
import express from 'express'
import { OrderStatus } from '../../infrastructure/helpers/SystemType'
import { Presenter } from '../payment/presenter'

@JsonController("/payment")
export class PaymentController {
    @Post('')
    async paymentProcess(@Req() request: express.Request) {
        let { id, status } = await PaymentRepository.paymentProcess()
        
        return Presenter.reply({ id, status })
    }
}