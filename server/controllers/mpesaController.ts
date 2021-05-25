import { Request, Response } from 'express';
var mysql = require('mysql');
import store from '../serverConfig'
import {store_transaction} from '../helpers/mpesa_helper'
var pool = mysql.createPool(store.rootDatabase);



class MpesaController {
    public index(req: Request, res: Response) {

        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                console.log(err)
            }
            //console.log(connection)

            res.status(200).send('Success')

        })
    }
    public storeTransaction(req: Request, res: Response) {
        console.log('-----------C2B CONFIRMATION REQUEST------------');
        console.log(req.body);
        const { SenderFirstName: first_name, SenderLastName: last_name, SenderMSISDN: sender, AccountReference: accRef, TransactionTime: Timestamp, TransactionAmount: amt } = req.body
        console.log(sender, amt, accRef)
        //const code = sha3_256(first_name+AccRef+Timestamp).toString('base64')

        const date = Timestamp
        const year = date.slice(0, 4)
        const month = date.slice(4, 6)
        const day = date.slice(6, 8)
        const time = date.slice(8, 10) + ":" + date.slice(10, 12)
        var f_Date = year + "-" + month + "-" + day

        var messageJson = {
            "ResultCode": 0,
            "ResultDesc": "Success",
            "PackageNumber": accRef,
            "Timestamp": Timestamp,
            "Sender": sender,
            "TokenCode": null,
            'FirstName': first_name
        };

        const sender_name = first_name + ' ' + last_name
        var message = "You have received rent payment for Room number " + accRef + " on " + f_Date + ":" + time + ". Amount:" + amt + "\nSender: " + first_name + " " + last_name
        //console.log(req.body)
        var remark = 'Auto update the last paid date'


        pool.getConnection(function (err: any, connection: any) {
            connection.beginTransaction(function (err: any) {
                if (err) {                  //Transaction Error (Rollback and release connection)
                    connection.rollback(function () {

                        connection.release();
                        //Failure
                    });
                } else {
                    const options = [f_Date, sender_name, accRef, sender, amt, remark,f_Date]
                    store_transaction(options, connection,function (err:any,result: any){
                        if(err){
                            res.status(500).send(err)
                        }
                        else{ 
                            res.status(200).send('The transaction has been stored successfully')
                        }
                    })
                    
                }
            })
        }) 


        //console.log(code)
        //sendATMessage(message)
        //res.json(message);

    }
    public confirmation(req: Request, res: Response) {
        res.send('Hello')
    }
}

export const mpesaController = new MpesaController();

