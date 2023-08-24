type Schedule = {
    _id?: string;
    name: String,
    contact_number: String,
    date: Date,
    time: Number,
    helper: Number,
    vehicle_id: String,
    pickup_location: String,
    destination_location: String
}

export default Schedule;