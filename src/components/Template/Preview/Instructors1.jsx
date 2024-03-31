import React from "react";
import Card from "react-bootstrap/Card";
import "./instructors.css";
import Prajakta from "../../../utils/Template/instructor/Prajakta.jpg";

const Instructor1 = (instructors, setInstructors) => {
    return (
        <div>
            <div className="flex flex-col w-[78%] ml-[7.56%] instructor-contanier item-center">
                <div className="grid  md:grid-cols-3 justify-center ml-[8%] pt-[3rem] ">
                    <div className="inst-card">
                        <Card
                            className="Box"
                            style={{
                                backgroundImage: `url(${Prajakta})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "20rem",
                                borderRadius: "10px",
                            }}
                        >
                            <div className="overlay"></div>
                            <div className="instructor-card-text flex flex-col items-center">
                                <h4 className="text-[1.3rem] font-semibold">Prajakta</h4>
                                <h6>Master Instructor</h6>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor1;