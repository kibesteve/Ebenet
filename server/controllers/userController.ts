import { Request, Response } from 'express';
var mysql = require('mysql');

import store from '../serverConfig'

var pool = mysql.createPool(store.rootDatabase);

class UserController {
    public index(req: Request, res: Response) {
        res.send({ firstname: "John" })
    }

    public getRoomData(req: Request, res: Response) {
        const current_date = new Date()
        pool.getConnection(function (err: any, connection: any) {
            var sql1 = "SELECT * FROM eben.rooms;"
            connection.query(sql1, function (err: any, result: any) {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                }
                //Calculate rent balance
                result.map((room: { last_payment_date: string | number | Date;rent_status:any ;days: number; rent_mode: string; rent_balance: number; }) => {
                    
                    //console.log(room.last_payment_date)
                    var days = Math.floor((current_date.getTime() - new Date(room.last_payment_date).getTime()) / 86400000)
                    room.days = days
                    var rent = 0

                    if(room.rent_mode=='Semester'){
                        rent = days * 150
                        room.rent_balance = 13500 - rent

                    }else{
                        rent = days *167
                        room.rent_balance = 5000 - rent
                    }
                    if(room.rent_balance>750){
                        room.rent_status =1
                    }else if(room.rent_balance<0){
                        room.rent_status =2
                    }else{
                        room.rent_status = 0
                    }
                    
                   
                    
                    
                    
                    console.log(result)

                })
                res.send(result)
            })


        })


    }
}

export const userController = new UserController();

