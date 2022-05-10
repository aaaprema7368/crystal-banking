const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    user:"Prema",
    host:"localhost",
    password:"prema7368",
    database:"project_bank"
});

app.post('/login',(req,res)=>{
const userid=req.body.userid;
const password=req.body.password;

    db.query(
        'SELECT * from user_details where userid=? and Password=?',
        [userid,password],
        (err,result)=>{

            if(err){
            console.log(err)
                res.send({err:err});
            }
            else
            if(result.length>0){
                console.log(result);
                res.send(result);
            }
            else
            {
                console.log(result)
                console.log("Invalid userId or password!!!");
                res.send({message:"Invalid userId or password!!!"});
                
            }
        }
    );

});





app.post('/get_account',(req,res)=>{
    const userid=req.body.userid;
        db.query(

            "SELECT  AD.id as AccountID, AD.AccountType ,AD.Card_type,AD.UserID,AD.AccountNo,AD.Branch,AD.IFSCCode,AD.Card_account, CASE WHEN (Sum(PB.amount_add)-Sum(PB.amount_minus)) IS NULL THEN 0 ELSE (Sum(PB.amount_add)-Sum(PB.amount_minus)) END as Closing_Balance FROM  account_details AD LEFT JOIN pass_book PB ON PB.Account_ID=AD.id WHERE AD.UserID=? GROUP BY AD.Card_Type ORDER BY AD.id ASC",

            [userid],
            (err,result)=>{
    
                if(err){
                console.log(err)
                    res.send({status:false,message:err});
                }
                else
                if(result.length>0){
                    console.log(result);
                    res.send({status:true,message:"Data Founded!!!",data:result});
                }
                else
                {
                    console.log("Invalid userId");
                    res.send({status:false,message:"Invalid userId"});
                    
                }
            }
        );
    });



    app.post('/get_statement',(req,res)=>{
        const userid=req.body.userid;
        const accountNo=req.body.accountno;
            db.query(
    
                "SELECT DATE_FORMAT(PB.trans_Date, '%Y-%m-%d') as trans_Date,PB.remarks,PB.Id,PB.closing_on_trans,(CASE when PB.trans_type='Debit' then Concat('<strong style=color:red> -', PB.amount_minus ,'</strong>') when PB.trans_type='Credit' then Concat('<strong style=color:green> +', PB.amount_add , '</strong>') End  ) as trans_type from pass_book PB INNER JOIN account_details AD ON AD.id=PB.Account_ID where AD.UserID=? and AD.AccountNo=? ORDER BY PB.id desc",
    
                 [userid,accountNo],
                (err,result)=>{
        
                    if(err){
                    console.log(err)
                    res.send({status:false,message:err});
                    }
                    else
                    if(result.length>0){
                        console.log(result);
                        res.send({status:true,message:"Data Founded!!!",data:result});
                    }
                    else
                    {
                        console.log("No Record");
                        res.send({status:false,message:"No Records"});
                        
                    }
                }
            );
        
        });
    

        

        app.post('/insert_tarnsfer_Fund',(req,res)=>{
        const userid=req.body.u_userID;
        const u_accountname=req.body.u_accountname;
        const u_accountno=req.body.u_accountno;
        const b_accountno=req.body.b_accountno;
        const amount=req.body.amount;
        const remarks=req.body.remarks;
        var isgetted=false;

        var closingamt="";
        var accntID="";
        var accountType="";
        
        db.query(

            "SELECT AD.id,AD.AccountType,(SUM(PB.amount_add) - SUM(PB.amount_minus)) as closing from account_details AD LEFT JOIN pass_book PB on PB.Account_ID=AD.id where AD.UserID=?",

        [userid],
        (err,result)=>{
            if(err){
                console.log("errIN "+err);
                res.send({status:false,message:err});
                isgetted=false;
                return;
            }else {
                console.log(result);
                closingamt=result[0].closing;
                accntID=parseInt( result[0].id);
                accountType=result[0].AccountType;
                closingamt=parseFloat(closingamt-amount);
                isgetted=true;
            }
            if(isgetted){
                //console.log('INSERT INTO pass_book (Account_ID,AccountName,AccountNo,trans_type,amount_minus,amount_add,closing_on_trans,beneficiary_accno,remarks,trans_Date,trans_date_time) VALUES ('+accntID+','+u_accountname+','+u_accountno+',Debit,'+amount+',0,'+closingamt+','+b_accountno+','+remarks+',CURDATE(),NOW())');
                db.query(
                    'INSERT INTO pass_book (Account_ID,AccountName,AccountNo,trans_type,amount_minus,amount_add,closing_on_trans,beneficiary_accno,remarks,trans_Date,trans_date_time) VALUES (?,?,?,?,?,?,?,?,?,CURDATE(),NOW())',
        
                     [accntID,u_accountname,u_accountno,'Debit',amount,0,closingamt,b_accountno,remarks],
                    (err,result)=>{
                        if(err){
                        console.log(err)
                        res.send({status:false,message:err});
                        }
                        else
                        {console.log(result);
                            res.send({status:true,message:"Transfer of Rs."+amount+ " from your "+accountType+" is Successfull!"});
                        }
                    }
                );
            }
        }
        );
           
        });
    
    

const port=process.env.port || 3001
app.listen(port,()=> console.log(`Listenong on port ${port}... `));