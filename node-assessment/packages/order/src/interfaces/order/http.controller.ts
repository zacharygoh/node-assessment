import { JsonController, Param, Body, Get, Post, HttpCode, Res, Req } from "routing-controllers"
import OrderRepository from "./repository"
import express from 'express'
import { OrderStatus } from '../../infrastructure/helpers/SystemType'
import { Presenter } from '../order/presenter'

@JsonController("/order")
export class OrderController {
    @Post("")
    async createOrder() {
        return Presenter.reply(await OrderRepository.create())
    }
}