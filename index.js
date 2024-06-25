const express=require("express")
const app=express()
const port=3500
app.use(express.json())
let room=[{
    id:1,
    name:"Room 1",
    seats:6,
    amenities:["kitchen,ac,bathroom"],
    price:3000
},{
    id:2,
    name:"Room 2",
    seats:5,
    amenities:["kitchen,bathroom"],
    price:2500
},{
    id:3,
    name:"Room 3",
    seats:6,
    amenities:["bathroom"],
    price:2000
}]
let bookings=[{
    id:1,
    customer:"bala",
    start:"2024-10-12",
    end:"2024-10-16",
    roomid:"Room 1",
    bookingdate:"2024-09-08",
    status:"comfirmed"
},{
    id:1,
    customer:"bala",
    start:"2024-11-12",
    end:"2024-11-19",
    roomid:"Room 1",
    bookingdate:"2024-10-10",
    status:"comfirmed"
},{
        id:2,
        customer:"naveen",
        start:"2024-5-02",
        end:"2024-5-17",
        roomid:"Room 2"},{
            id:3,
            customer:"ramya",
            start:"2024-11-26",
            end:"2024-12-16",
            roomid:"Room 3"}]
app.post("/room",(req,res)=>{
    const {seats,amenities,price}=req.body
   const newroom={
    id:room.length+1,
    name:`Room ${room.length+1}`,
    seats,
    amenities,
    price
   }
   room.push(newroom)
    res.status(201).send(newroom)
})
app.post("/booking",(req,res)=>{
    const {customer,start,end,roomid}=req.body
   const newroom={
    id:room.length+1,
    customer,
    start,
    end,
    roomid,
    bookingdate:new Date(),
    status:"confirmed"
   }
   bookings.push(newroom)
    res.status(201).send(newroom)
})
app.get('/rooms', (req, res) => {
    const roomData = room.map(val => {
      const roomBookings = bookings.filter(booking => booking.id === val.id);
      return {
        ...val,
        bookings: roomBookings.map(booking => ({
         customer:booking.customer,
         date: booking.date,
         startTime: booking.start,
         endTime: booking.end
        }))
      };
    });
    res.json(roomData);
  });
  
  app.get('/customers', (req, res) => {
    const roomData = bookings.map(val => {
        return {
            customer:val.customer,
            room:room.find(vall=>val.id==vall.id).name,
            date:val.date,
            starttime:val.start,
            endtime:val.end
        }
    });
    res.json(roomData);
  });
  app.get('/customers/:name/bookings', (req, res) => {
    const customername=req.params.name
    const cbooking=bookings.filter(val=>val.customer===customername)
    const roomData = cbooking.map(val => {
     return {
        customername:val.customer,
        roomname : room.find(vall=>val.id==vall.id).name,
        date:val.date,
        startTime:val.start,
        endTime:val.end,
        bookingsid:val.id,
        bookingdate:val.bookingdate,
        status:val.status
     }
    });
    res.json(roomData);
  });


app.listen(port,()=>{
    console.log("okk")
})