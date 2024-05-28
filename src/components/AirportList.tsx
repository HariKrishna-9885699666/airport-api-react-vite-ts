// src/components/AirportList.tsx
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { fetchAirports } from "@services/airportsApi";
import { countries, timezones } from "@lib/constants";
import { AirportDef } from '../types';
import AirportCard from "./AirportCard";

interface FilterFormData {
  searchQuery: string;
  country: string;
  timezone: string;
}

const AirportList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState<AirportDef[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [noAirportsFound, setNoAirportsFound] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FilterFormData>();

  useEffect(() => {
    reset(); // Clear filters on initial load
  }, [reset]);

  const onSubmit: SubmitHandler<FilterFormData> = async (data) => {
    setOffset(0);
    setHasMoreResults(true);
    setNoAirportsFound(false);
    const countryName: string | undefined = countries.find(
      (country) => country.code === data.country
    )?.name;
    setCurrentCountry(countryName ?? "");
    if (!data.searchQuery && !data.country && !data.timezone) {
      return; // Do not call API if no filters are applied
    }

    try {
      setIsLoading(true); // Start loading
      const fetchedAirports = await fetchAirports(
        data.searchQuery,
        data.country,
        data.timezone,
        0 // Reset offset to 0 on new search
      );
      setAirports(fetchedAirports);
      setHasMoreResults(fetchedAirports.length >= 1);
      setNoAirportsFound(fetchedAirports.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true); // Start loading
      const { searchQuery, country, timezone } = getValues();
      const fetchedAirports = await fetchAirports(
        searchQuery || "",
        country || "",
        timezone || "",
        offset + 30
      );
      setAirports([...airports, ...fetchedAirports]);
      setHasMoreResults(fetchedAirports.length >= 1);
      setOffset(offset + 30);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleClear = () => {
    reset(); // Clear all form fields
    setAirports([]); // Clear results
    setHasMoreResults(true); // Reset hasMoreResults flag
    setNoAirportsFound(false); // Reset noAirportsFound flag
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Search by Name:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Enter airport name"
              {...register("searchQuery", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Only alphabets and spaces are allowed",
                },
              })}
              isInvalid={!!errors.searchQuery}
            />
            <Form.Control.Feedback type="invalid">
              {errors.searchQuery?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Filter by Country:
          </Form.Label>
          <Col sm="9">
            <Form.Select {...register("country")}>
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Filter by Timezone:
          </Form.Label>
          <Col sm="9">
            <Form.Select {...register("timezone")}>
              <option value="">All Timezones</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Search"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </Form>

      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <Spinner animation="border" variant="primary" size="lg" />
        </div>
      )}

      {/* Display Airport Cards */}
      <Row className="mt-4">
        {airports.map((airport) => (
          <Col key={airport.icao} sm={12} md={6} lg={4} xl={3}>
            <AirportCard airport={airport} />
          </Col>
        ))}
      </Row>

      {noAirportsFound && (
        <div className="text-center my-5">
          <h4>No airports found in {currentCountry || "this area"}.</h4>
        </div>
      )}

      {airports.length > 0 && hasMoreResults && !isLoading && ( // Show only if there are airports and not loading
        <div className="d-grid gap-2 justify-content-center">
          <Button
            variant="success"
            size="sm"
            onClick={handleLoadMore}
            className="px-3 py-1 mb-2"
            style={{ width: "150px" }}
          >
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AirportList;
