import React from "react";
import { NavLink } from "react-router-dom";
import guide from "../assets/user.pdf";

const HowToApply = () => {
  return (
    <>
      <div class="container p-3">
        <ul class="list-group mt-5">
          <li class="list-group-item text-center active">
            <h2>INSTRUCTION FOR ONLINE APPLICATION</h2>
          </li>
          <li class="list-group-item">
            <b>[A]</b>
            <u> List of Available Areas</u>
            <br />
            <div class="row w-75 p-1">
              Before applying online, It is individual applicant's sole
              responsibility to double check the following availability
              carefully.
              <table class="mt-1 table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Faculty of</th>
                    <th scope="col"> Area </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="3">Technology &amp; Engineering</td>
                    <td>Computer Engineering</td>
                  </tr>
                  <tr>
                    <td>Civil Engineering</td>
                  </tr>
                  <tr>
                    <td>Mechanical Engineering</td>
                  </tr>
                  <tr>
                    <td rowspan="4">Sciences</td>
                    <td>Physical Sciences</td>
                  </tr>
                  <tr>
                    <td>Biological Sciences</td>
                  </tr>
                  <tr>
                    <td>Chemical Sciences</td>
                  </tr>
                  <tr>
                    <td>Mathematical Sciences</td>
                  </tr>
                  <tr>
                    <td rowspan="2">Management Studies</td>
                    <td>Management Studies</td>
                  </tr>
                  <tr>
                    <td>English &amp; communication</td>
                  </tr>
                  <tr>
                    <td rowspan="5">Computer and Applications</td>
                    <td>Artificial Intelligence</td>
                  </tr>
                  <tr>
                    <td>Internet of Things(IOT)</td>
                  </tr>
                  <tr>
                    <td>Data Science</td>
                  </tr>
                  <tr>
                    <td>Cloud Computing</td>
                  </tr>
                  <tr>
                    <td>Network Technologies</td>
                  </tr>
                  <tr>
                    <td rowspan="4">Pharmacy</td>
                    <td>Pharmaceutics and Pharmaceutical Technology</td>
                  </tr>
                  <tr>
                    <td>Pharmacology and Clinical Pharmacy</td>
                  </tr>
                  <tr>
                    <td>Pharmacology and Phytochemistry</td>
                  </tr>
                  <tr>
                    <td>Pharmaceutical Chemistry and Analysis</td>
                  </tr>
                  <tr>
                    <td rowspan="4">Medical Sciences</td>
                    <td>Mobility Limitations (Physiotherapy)</td>
                  </tr>
                  <tr>
                    <td>
                      Outcome Measurement and Knowledge translation
                      (Physiotherapy)
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Type 2 Diabetes Mellitus Academic Performance Yoga Therapy
                      Quality of Life (Physiotherapy)
                    </td>
                  </tr>
                  <tr>
                    <td>Protein Science (Paramedical Science)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>

          <li class="list-group-item">
            <b>[B]</b> Read the minimum eligibility criteria and Selection
            process before apply.
            <div class="media text-muted pt-3">
              <img
                data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1"
                alt=""
                class="mr-2 rounded"
              />
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark"></strong>
                <br />
                <table border="0" class="rounded-list">
                  <tr>
                    <td>
                      <ol>
                        <li>
                          <p>
                            A post-graduate (Masters) degree with First class or
                            equivalent CGPA and has qualified in National level
                            examinations such as GATE / CSIR – UGC JRF / NET /
                            SLET / GPAT OR latest CHARUSAT Doctoral Entrance
                            Test (CDET).
                          </p>
                        </li>
                        <li>
                          <p>
                            Students who have appeared in Final year PG are
                            eligible to apply provided they have aggregate First
                            class (without backlog) or equivalent CGPA/SGPA in
                            last three semesters.
                          </p>
                        </li>
                        <li>
                          <p>
                            The candidates who have cleared National/State level
                            competitive examinations (as defined in 1) are
                            exempted from CHARUSAT CDET exam. They will be
                            called for interaction directly.
                          </p>
                        </li>
                        <li>
                          <p>
                            Eligible Candidates will be short-listed based on
                            the above criteria.
                          </p>
                        </li>
                        <li class="text-justify p-2">
                          All entries should be carefully made while applying
                          online. CHARUSAT will not be responsible for wrong
                          entries. Candidates shall be sole responsible for the
                          correctness and authenticity of the information /
                          documents provided in the online application.
                        </li>
                        <li class="text-justify p-2">
                          Online application submitted by the candidates shall
                          be considered final. Requests for making correction in
                          the online application shall not be entertained.{" "}
                          <br />
                        </li>
                        <li class="text-justify p-2">
                          CHARUSAT will not be responsible for technical error
                          while making the online application / payment of fee.
                          Therefore, candidates are advised to submit their
                          application well in advance without waiting until the
                          last date
                        </li>
                        {/* <!--<li class="text-justify p-2">Admission will be offered subject to availability of seats.</li>--> */}
                        <li class="text-justify p-2">
                          The Institute reserves the right to verify the
                          antecedents or documents submitted by the candidate at
                          any time during their period of study. In case it is
                          found that the documents submitted by the candidate
                          are not genuine, then his/her admission shall be
                          terminated, and disciplinary / criminal proceedings
                          will be initiated.
                        </li>
                        <li class="text-justify text-danger p-2">
                          For any updates, please visit Univerisy website
                          regularly, for subsequent amendments in the
                          advertisement and results. The University shall not be
                          responsible for the failure of candidates with respect
                          to visiting the website on any ground.
                        </li>
                      </ol>
                    </td>
                  </tr>
                </table>
              </p>
            </div>
          </li>

          <li class="list-group-item">
            <b>[C]</b> For admission to Ph.D. programmes (Academic Year
            2021-22), candidates need to register and fill the application
            ONLINE only by accessing the website{" "}
            <strong>
              <a
                href="https://www.charusat.ac.in/"
                class="text-decoration-none"
                target="_blank"
              >
                www.charusat.ac.in
              </a>{" "}
              on or before June 23, 2021(4:00 pm, IST).
            </strong>{" "}
            <br /> <br />
            <div class="row w-75 p-1">
              Before applying online, candidates are required to keep ready the
              following documents for uploading:
              <table class="mt-1 table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"> Particulars </th>
                    <th scope="col">Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      Soft copy of colour passport size photograph{" "}
                      <span class="text-primary">(only in JPG/JPEG/PNG)</span>{" "}
                    </td>
                    <td rowspan="4" colspan="1">
                      <strong>Up to 1 MB each</strong>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      Soft copy of Signature{" "}
                      <span class="text-primary">(only in JPG/JPEG/PNG)</span>
                    </td>
                    .
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      Master’s Degree or Provisional/Last 3 semester Marksheets{" "}
                      <span class="text-primary">(only in JPG/JPEG/PNG)</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      GATE / NET / JRF etc., score card (if applicable)
                      <span class="text-primary">
                        (only in JPG/JPEG/PNG)
                      </span>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li class="list-group-item">
            Candidates must follow the following Steps while filling online
            Application Form:{" "}
            <strong>
              <NavLink
                to={guide}
                // download={guide}
                target="_blank"
                class="text-decoration-none"
              >
                Download Guideline To Fill-up Application
              </NavLink>
            </strong>
          </li>
          <ul class="p-2">
            <li class="p-2">
              STEP-1 Application fees{" "}
              <strong>
                <NavLink to="/paymentguidelines" class="text-decoration-none">
                  Visit Payment Menu
                </NavLink>
                .
              </strong>
            </li>
            <li class="p-2">STEP-2 Register yourself</li>
            <li class="p-2">STEP-3 Verify Email-ID</li>
            <li class="p-2">
              STEP-4 Login into Portal to fill-up application form.
            </li>
            <li class="p-2">STEP-5 Submit Application.</li>
            <li class="p-2">
              STEP-6 Check registered Email-ID to dowload Application.
            </li>
          </ul>
          <li class="list-group-item p-2">
            Candidates can download Application form for their own record.{" "}
          </li>
        </ul>
      </div>
    </>
  );
};

export default HowToApply;
