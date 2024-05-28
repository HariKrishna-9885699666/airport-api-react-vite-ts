import React from "react";

interface Airport {
  name: string;
  iata: string;
  icao: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation_ft: string;
}

interface AirportCardProps {
  airport: Airport;
}

const AirportCard: React.FC<AirportCardProps> = ({ airport }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4 className="card-title">{airport.name}</h4> {/* Heading in the header */}
      </div>
      <div className="card-body">
        <p className="card-text">
          <span className="fw-bold">City:</span> {airport.city},{" "}
          <span className="fw-bold">Country:</span> {airport.country}
        </p>
        <p className="card-text">
          <span className="fw-bold">Timezone:</span> {airport.timezone}
        </p>
        <p className="card-text">
          <span className="fw-bold">Latitude:</span> {airport.latitude} |{" "}
          <span className="fw-bold">Longitude:</span> {airport.longitude}
        </p>
        <p className="card-text">
          <span className="fw-bold">Elevation:</span> {airport.elevation_ft} ft
        </p>
      </div>
    </div>
  );
};

export default AirportCard;
