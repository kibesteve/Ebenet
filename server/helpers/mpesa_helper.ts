export async function store_transaction(options:any,connection:any,callback:any) {
    
    const sql1 =  "start transaction; INSERT INTO eben.payments set date = ?, payee_name =?,room_no=?, mobile_no = ? , amount= ?,Remark= ?;" 
    
    const sql2 = "update eben.rooms set last_payment_date = ? where room_no=?;"
    connection.query(sql1, options, function (err: any, result: any) {
        if (err) {
            console.log(err)
            callback(err)
        }
        else {
            const room_no = 2
            //console.log(options)
            const date = options[0]
            const options2 = [date,room_no]
            //console.log(options2)
            connection.query(sql2, options2, function (err: any, result: any) {
                if (err) {
                    console.log(err)
                    callback(err)
                }else{
                    connection.commit(function (err: any) {
                        if (err) {
                            console.log('Err while commiting insert user_projects : ', err.message);
                            //updateAssHrsJson.message = updateAssHrsJson.message + ' Err while commiting insert user_projects : '
                            connection.rollback(function () {
                                throw err;
                            });
                        } else {
                            console.log('Recording and commiting tenant_payment Completed.');
                            //updateAssHrsJson.message += " Updating and commiting User_Project " + updateAssHrsJson.user_id + " Completed.\n"
                        }
                    })
                    callback(err,result);
                }
            })

                
            
        }

    })

}

export async function update_last_paid_date(options:any,connection:any,callback:any) {

}
