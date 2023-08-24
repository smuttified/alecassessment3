import React from "react";
import "../assets/css/product.css";
import Schedule from "../models/Schedule";

interface props {
    schedule: Schedule;
};

class BookingRow extends React.Component<props> {
    render() {
        return (
            <div className="row g-0 border-bottom row-hover">
                <div className="col-lg-2 py-0 px-2">{new Date(this.props.schedule.date).toDateString()} {this.props.schedule.time + ":00"}</div>
                <div className="col-lg-2 py-0 px-2">{this.props.schedule.name}  ({this.props.schedule.contact_number})</div>
                <div className="col-6 col-lg-3 py-0 px-2"><span className="d-inline d-lg-none text-primary">From : </span> {this.props.schedule.pickup_location}</div>
                <div className="col-6 col-lg-3 py-0 px-2"><span className="d-inline d-lg-none text-primary">To : </span>{this.props.schedule.destination_location}</div>
                <div className="col-lg-2 py-0 px-2">{this.props.schedule.vehicle_id} | {this.props.schedule.helper + " helper"} </div>
            </div>
        );
    }
}

export default BookingRow;