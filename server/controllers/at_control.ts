import { Request, Response } from 'express';
const request = require('request')
const sendATMessage = require('../helpers/at_helper')
const moment = require('moment')
var mysql = require('mysql');
const body_parser = require('body-parser')

import store from '../serverConfig'

function access(req:Request, res:Response, ) {
    const consumer_key = 'AtMudKP1N3UHyR6ISuivsh0mqvDIOHhT'
    const consumer_secret = '9XYzCNp4w3TumoKd'
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer(consumer_key+':'+consumer_secret).toString('base64')

    request(
        {
            url: url,
            headers: {
                "Authorization": "Basic " + auth
            } 
        },
        (err:any,response:any,body:any)=>{
            if (err){
                console.log(err)
            }else{
                //req.access_token = JSON.parse(body).access_token
                //next()
            }
            //console.log(body)
        })
} 
class ATController  {
    public index(req: Request, res: Response) {
        res.send({firstname: "John"})
    }
    
    public access_token(req: Request, res: Response) {
        res.status(200).json({access_token:req.params.access_token})
    }
    public register(req: any, res: Response) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
        var auth = "Bearer " + req.access_token

    request({ 
        url: url,
        method: 'POST',
        headers: {
            "Authorization": auth
        },json: {
            //600383: test credentials
            "ShortCode": "600383",
            "ResponseType": "Complete",
            "ConfirmationURL": "http://74ffe40abb85.ngrok.io/confirmation",
            "ValidationURL": "http://74ffe40abb85.ngrok.io/validation_url"
        }
    },function (error:any, response:any,body:any){
        if(error){
            console.log(error)
        }
        res.status(200).json(body)
    })

    }
    public stk(req: any, res: Response) {
        var endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        const auth = "Bearer " + req.access_token

        const timestamp:any = moment().format('YYYYMMDDHHmmss') //datenow.getFullYear() + "" + "" + datenow.getMonth() + "" + datenow.getDate() + "" + ""+ datenow.getHours()+ "" + "" + datenow.getMinutes() + "" + "" + getSeconds()
        const password = new Buffer('174379'+'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'+timestamp).toString('base64') //BS+PASK+TIME

        const req_params = {
            url: endpoint,
            method: 'POST',
            headers: {
                "Authorization": auth
            },json:{
                "BusinessShortCode": "174379",
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": "1",
                "PartyA": "254706229743",
                "PartyB": "174379",
                "PhoneNumber": "254706229743",
                "CallBackURL": "https://74ffe40abb85.ngrok.io/stk_callback",
                "AccountReference": "123TEST",
                "TransactionDesc": "Process activation"
            }

        }

        request(req_params,function(error:any, response:any,body:any){
            if(error){
                console.log(error)
            }
            res.status(200).json(body)

        })

    }
    public simulate(req: any, res: Response) {
        var url= "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
        var auth = 'Bearer ' + req.access_token

        request(
            {
                url: url,
                method: 'POST',
                headers: {
                    "Authorization": auth
                },json: {
                    //600383: test credentials
                    "ShortCode":"600383",
                    "CommandID":"CustomerPayBillOnline",
                    "Amount":"100",
                    "Msisdn":"254708374149",
                    "BillRefNumber":"W100"
                }
            },function (error:any, response:any,body:any){
                if(error){
                    console.log(error)
                }
                res.status(200).json(body)
            }
    )
    }
    public stk_callback(req: Request, res: Response) {
        console.log('..........STK Callback............')
        console.log(req.body)
    }

    public confirmation(req: Request, res: Response) {
        console.log('.............Confirmation..........')
        var mpesa_resp = req.body  
        console.log(mpesa_resp)
    }
    public validation(req: Request, res: Response) {
        console.log('...............Validation .....................')
        console.log(req.body)
    }
    public sendMessage(req: Request, res: Response) {
        sendATMessage()
        res.status(200).json({success:"Message sent"})
    }
}

export const AtController = new ATController();
