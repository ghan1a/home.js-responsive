import React from "react";

import Cards from "../Boats/Cards";
import Header from "../Header";
import Boats from "../Boats/Boat";
import imagefile from "../../images/ss.PNG";
import { BiSearch } from "react-icons/bi";
import imgchat from "../../images/chaticon.svg";
import imgp1 from "../../images/p11.PNG";
import imgp2 from "../../images/p22.PNG";
import imgp3 from "../../images/p33.PNG";
import Boat from '../Card/Boat'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./home.css";
import bg from "../../images/bg.svg";
import shw from "../../images/shw.svg";
import star from "../../images/star.PNG";
import thumb from "../../images/thumb.PNG";
import trust from "../../images/trust.PNG";
import msg from "../../images/msg.PNG";
import ball from "../../images/ball.svg";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { useLocation } from "react-router-dom";

  import axios from "axios";


function Home() {
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tP3ShP-9wzEnWdpbIN_wFBepMr7m4WoAsQ&usqp=CAU";

      const [startDate, setStartDate] = useState(null);
      const [endDate, setEndDate] = useState(null);
       const [destination, setDestination] = useState("");
       const location = useLocation();

     const handleDateChange = (dates) => {
       const [start, end] = dates;
       setStartDate(start);
       setEndDate(end);
       console.log(start + "  " + end);
     };



  const handleSearchClick = () => {
    if (destination.trim() === "") {
      // Handle case when destination is empty
      alert("Please enter a destination.");
    } else if (startDate && endDate) {
      // Assuming you have destination, startDate, and endDate variables
      const apiUrl = "http://192.168.18.77:8000/api/boats/availability/";

      // Construct your parameters to be sent in the GET request (modify as needed)
       const formatDate = (date) => {
         const d = new Date(date);
         const day = String(d.getDate()).padStart(2, "0");
         const month = String(d.getMonth() + 1).padStart(2, "0");
         const year = d.getFullYear();
         return `${year}-${month}-${day}`;
       };
      const params = {
        location: destination,
        from_date: formatDate(startDate),
        to_date: formatDate(endDate),
      };

      // Make the GET request using Axios
      axios
        .get(apiUrl, { params })
        .then((response) => {
          // Handle the response data as needed
          console.log("Response data:", response.data);
          // Now you can navigate to the search page or perform other actions
          navigateToSearchPage(startDate, endDate, destination, response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
          alert("Error occurred while fetching data.");
        });
    } else {
      // Handle case when dates are not selected or invalid input
      alert("Please select valid date range.");
    }
  };



    const handleDestinationChange = (event) => {
      setDestination(event.target.value);
    };


 const navigateToSearchPage = (
   startDate,
   endDate,
   destination,
   responseData
 ) => {
   // Convert the response data to a URL-friendly format (e.g., JSON.stringify if it's an object)
   const encodedData = encodeURIComponent(JSON.stringify(responseData));

   // Create the query string with URL parameters
   const queryString = `?start=${startDate}&end=${endDate}&destination=${destination}&data=${encodedData}`;

   // Concatenate the query string with the search page path
   const searchPagePath = "/search" + queryString;

   // Perform the navigation
   window.location.href = searchPagePath;
 };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div
        className="container-fluid"
        style={{
          backgroundColor: "rgb(0, 191, 255)",
          width: "100%",
          height: "450px",
          display: "flex",
        }}
      >
        <div
          className="experience col-sm-10 col-md-4 col-lg-3 "
          style={{ position: "relative", top: "50px", left: "90px"}}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Let's find your next life experience
              </h5>
              <p className="card-text">
                Line 1 of the paragraph Line 1 of the paragraph Line 1 of the
                paragraph
                <br />
                Line 2 of the paragraph Line 1 of the paragraphLine 1 of the
                paragraph
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for destination"
                  aria-label="Search for destination"
                  aria-describedby="search-icon"
                  value={destination}
                  onChange={handleDestinationChange}
                  required // Make the destination field required
                />
                <span className="input-group-text" id="search-icon">
                  <BiSearch />
                </span>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="date-icon">
                  <MdDateRange />
                </span>
                <DatePicker
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  selectsRange
                  showPopperArrow={false}
                  className="form-control date-picker-input"
                  placeholderText="Pick your Dates"
                  aria-label="Select a date range"
                  aria-describedby="date-icon"
                  required // Make the date picker required
                />
                <span className="input-group-text">
                  <BsChevronDown />
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary float-end"
                onClick={handleSearchClick}
              >
                Let's go
              </button>
            </div>
          </div>
        </div>
        <div className="col-3"></div>

        <div className="col-6 float-end">
          <img
            src={imagefile}
            width="500px"
            alt="Your Image"
            className="float-end"
          />
        </div>
      </div>
      {/*  */}
      <div>
        <div>
          <div className="row m-3">
            <div className="col">
              <h3 className="text-center">Centered Heading</h3>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={imgp1}
                  alt="Image 1"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 1</h5>
                <p className="card-text">This is the first card's paragraph.</p>
              </div>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={imgp2}
                  alt="Image 2"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 2</h5>
                <p className="card-text">
                  This is the second card's paragraph.
                </p>
              </div>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={imgp3}
                  alt="Image 3"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 3</h5>
                <p className="card-text">This is the third card's paragraph.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div
        className="row justify-content-center mt-5 pb-5 p-5  paddingbottom"
        style={{ backgroundColor: "#f5f5f5", paddingBottom: "20px" }}
      >
        <div className="row mt-2 mb-2">
          <div className="col">
            <h6 className="text-center">Centered Heading</h6>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col">
            <h3 className="text-center">Centered Heading</h3>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col">
            <p className="text-center">Centered Heading</p>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center ">
          <div className="col-1 d-flex align-items-center justify-content-center">
            <span className="p-3">
              <IoIosArrowBack className="icon" />
            </span>
          </div>
          <div className="col-3 m-3">
            <div
              className="card bg-image"
              style={{
                backgroundImage:
                  "url('https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSsY5IJQtsTUDmP-3R4XJileZTmJAPGl0de9F7-ypX_6TjLBvWjVmE87shSITtlqQbI')",
                height: "300px",
                backgroundSize: "cover",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title name"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  Name 3
                </h5>
                <p
                  className="card-text"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  One-line paragraph 3
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 m-1">
            <div
              className="card bg-image"
              style={{
                backgroundImage:
                  "url('https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/07/14/oia-santorini.jpg?quality=75&width=1368&auto=webp')",
                backgroundSize: "cover",
                height: "300px",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title name"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  Name 3
                </h5>
                <p
                  className="card-text"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  One-line paragraph 3
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 m-3">
            <div
              className="card bg-image"
              style={{
                backgroundImage:
                  "url('https://www.greecetravelsecrets.com/wp-content/uploads/2019/10/IMG_9088-1080x675.jpg')",
                backgroundSize: "cover",
                height: "300px",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title name"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  Name 3
                </h5>
                <p
                  className="card-text"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    top: "200px",
                    color: "white",
                  }}
                >
                  One-line paragraph 3
                </p>
              </div>
            </div>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <IoIosArrowForward className="icon" />
          </div>
        </div>
      </div>
      {/*  */}

      <div className="row justify-content-center">
        <div className="col-sm-12 " style={{ position: "absolute", top: "1340px" }}>
          <div
            className="card p-2 "
            style={{ backgroundColor: "rgb(251, 120, 72)" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="col-3">
                  <p>This is a paragraph</p>
                </div>
                <div className="col-6 col-sm-12 col-md-6">
                  <div className="d-flex flex-wrap col-sm-12">
                    <div>
                      <button className="btn custom-btn m-2 ">Button 1</button>
                      <button className="btn custom-btn m-2">Button 2</button>
                      <button className="btn custom-btn m-2">Button 3</button>
                      <button className="btn custom-btn m-2">Button 4</button>
                    </div>
                    <div>
                      <button className="btn custom-btn m-2">Button 5</button>
                      <button className="btn custom-btn m-2">Button 6</button>
                      <button className="btn custom-btn m-2">Button 7</button>
                      <button className="btn custom-btn m-2">Button 8</button>
                    </div>
                  </div>
                </div>
                <img
                  style={{ position: "relative", top: "20px", left: "35px" }}
                  src={ball}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bg */}
      <div
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
        }}
        className="p-5"
      >
        <div className="row mt-5 mb-3 pt-5">
          <div className="col">
            <h3 className="text-center">Centered Heading</h3>
          </div>
        </div>
        <div className="row ">
          <div className="col">
            <p className="text-center">Centered Heading</p>
          </div>
        </div>

        <div className="row justify-content-center col-sm-12 mt-5 mb-5">
          <Boat />
        </div>
        <div className="row mt-5 mb-3 justify-content-center">
          <div className="col text-center">
            <button
              className="btn button rounded-end "
              style={{ backgroundColor: "#0BFFF" }}
            >
              Browse all listings
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className="row justify-content-center text-center mb-4"
        style={{ backgroundColor: "#0066FF" }}
      >
        <div className="col-4 " style={{ color: "white", textAlign: "left" }}>
          <h1 style={{ textAlign: "left" }}>Are you a boat owner?</h1>
          <p style={{ textAlign: "left" }}>
            Text about what Sail it Easy offers to owners and mention the
            competitive advantage. Text about what Sail it Easy offers to owners
            and mention the competitive advantage.
          </p>
          <h3 style={{ textAlign: "left" }}>Sounds interesting?</h3>
          <p style={{ textAlign: "left" }}>
            Learn more about our growth tools.
          </p>
          <button
            className="btn rounded-end custom-button mb-4"
            style={{
              backgroundColor: "#FFEE58",
              color: "#0066ff",
              borderRadius: " 20px 20px 20px 20px",
            }}
          >
            <h5>show me</h5>
          </button>
        </div>
        <div className="col-md-4 m-3 p-3">
          <img
            src={imageUrl}
            alt="Your Image"
            style={{
              borderRadius: "5% 5% 0 0",
              marginBottom: "",
              height: "120%",
            }}
          />
        </div>
      </div>

      {/*  */}
      {/*  */}
      <div className="text-center ">
        <div className="mb-5">
          <div className="row m-5 ">
            <div className="col">
              <h3 className="text-center">Centered Heading</h3>
            </div>
          </div>
          <div className="row mt-3 justify-content-center mr-4">
            <div className="col-2 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={star}
                  alt="Image 1"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 1</h5>
                <p className="card-text">This is the first card's paragraph.</p>
              </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={thumb}
                  alt="Image 2"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 2</h5>
                <p className="card-text">
                  This is the second card's paragraph.
                </p>
              </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={trust}
                  alt="Image 3"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 3</h5>
                <p className="card-text">This is the third card's paragraph.</p>
              </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <img
                  src={msg}
                  alt="Image 3"
                  width="150px"
                  className="img-fluid"
                />
                <h5 className="card-title">Card Heading 3</h5>
                <p className="card-text">This is the third card's paragraph.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Home;
