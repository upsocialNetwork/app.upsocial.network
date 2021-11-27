import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from "react-router-dom";
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
const EditProfile = (props) => {
    const history = useHistory();
    const [value, setDate] = useState(new Date());
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState('');
    const [previmage, setPrevImage] = useState('');
    const [country, setCountry] = useState('');
    const [about, setAbout] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }
        else {
            // props._getProfile();
            const user = Session.getSessionData();
            //console.log(user);
            setUserName(user.userName);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAbout(user.about);
            setImage(user.image);
            setPrevImage(user.image);
            setEmail(user.email);
            //setDate("03/05/1998");
            if (user.country !== null) {
                setCountry(user.country);
            }
        }
    }, []);



    const navigate = (event) => {
        event.preventDefault()
    }

    const updateProfile = (event) => {
        Loader(true);
        event.preventDefault();

        const d = new Date(value);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        const date = `${ye}-${mo}-${da}`;
        //  console.log(date);

        let formData = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName,
            "about": about,
            "image": image,
            "email": email,
            "country": country
            // "dateOfBirth": date
        }

        //console.log(formData);
        //return null;

        httpClient.call('profile-update', formData, { method: 'PUT' }).then(function (response) {
            Loader(false);
            if (response.success == true) {
                // console.log(response.result.data);
                SuccessToast(response.result.message);
                Session.setSessionData(response.result.data);
                SetSassion(response.result.data)
            }
            else {
                //  console.log(response);
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }




    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            setImage(b64);
            setPrevImage(null);
            document.getElementById("profileimage").src = reader.result;
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 2) {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
            if (postType == "image") {
                convertFileToBase64(file);
            } else {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
        }
        else {
            ErrorToast('Please select file size less than 2 MB');
            return null;
        }

    }

    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="edit-profile-title">
                    <h4>Edit Profile</h4>
                </div>

                <div className="edit-profile-wrapper">


                    <div className="edit-associate-blk-wrapper">
                        {/*  <h5 className="associate-blk-title">Customize Profile</h5> */}
                        <div className="customize-profile">
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Profile Image:</p>
                                </div>
                                <div className="pf-lr-part grid">
                                    <div className="profile-avater size-big position-relative">
                                        {previmage ?
                                            <img className="avater-image img-fluid" src={"https://ipfs.io/ipfs/" + previmage} alt="" id="profile-image"

                                            /> :
                                            <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profileimage"

                                            />}
                                        {/* <img className="avater-image img-fluid" src="img/user.png" alt="" id="profile-image" 
                                        
                                        /> */}
                           {/*  */}
                                        {/* <label className="position-absolute upload type-2">
                                            <input type="file" name="" id="" />
                                            <img src="img/folder.svg" alt="" />
                                        </label> */}
                                    </div>

                                    <div className="upload-banner-img">
                                        <label className="upload type-2">
                                            <input type="file" name="" id=""
                                                onChange={(event) => { convertFile(event.target.files[0]) }}

                                                accept="image/*"
                                            />
                                            <img src="img/plus-5.svg" alt="" />
                                        </label>
                                        <p>Drag and Drop or Upload Banner Image </p>
                                    </div>

                                    <div className="restiction">
                                        <p>Image should be less than 2 MB</p>
                                    </div>
                                </div>
                            </div>


                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Profile Name: </p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="User Name" value={userName}
                                        disabled maxLength="15" onChange={(event) => { setUserName(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Email:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="email" className="form-control" placeholder="User Name" value={email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>First Name: <span style={{ color: 'red' }}> * </span></p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="First name"
                                        maxLength="15" onChange={(event) => { setFirstName(event.target.value) }} value={firstName}
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Last Name: <span style={{ color: 'red' }}> * </span></p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="Last name"
                                        maxLength="15" onChange={(event) => { setLastName(event.target.value) }} value={lastName}
                                    />
                                </div>
                            </div>
                            {/* <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Date Of Birth:</p>
                                </div>
                                <div className="pf-lr-part">

                                    <DatePicker onChange={(event)=>{setDate()}}
                                        value={value} />   </div>
                            </div> */}
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Country:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <select value={country} className="form-select select2" aria-label="Default select example" onChange={(event) => { setCountry(event.target.value) }}>
                                        <option defaultValue>Open this select Country</option>

                                        <option value="Afganistan">Afghanistan</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Anguilla">Anguilla</option>
                                        <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bermuda">Bermuda</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bonaire">Bonaire</option>
                                        <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                        <option value="Brunei">Brunei</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Canary Islands">Canary Islands</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Cayman Islands">Cayman Islands</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Channel Islands">Channel Islands</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos Island">Cocos Island</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Cote DIvoire">Cote DIvoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Curaco">Curacao</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="Czech Republic">Czech Republic</option>
                                        <option value="Denmark">Denmark</option>
                                        <option value="Djibouti">Djibouti</option>
                                        <option value="Dominica">Dominica</option>
                                        <option value="Dominican Republic">Dominican Republic</option>
                                        <option value="East Timor">East Timor</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="El Salvador">El Salvador</option>
                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                        <option value="Eritrea">Eritrea</option>
                                        <option value="Estonia">Estonia</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="Falkland Islands">Falkland Islands</option>
                                        <option value="Faroe Islands">Faroe Islands</option>
                                        <option value="Fiji">Fiji</option>
                                        <option value="Finland">Finland</option>
                                        <option value="France">France</option>
                                        <option value="French Guiana">French Guiana</option>
                                        <option value="French Polynesia">French Polynesia</option>
                                        <option value="French Southern Ter">French Southern Ter</option>
                                        <option value="Gabon">Gabon</option>
                                        <option value="Gambia">Gambia</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Gibraltar">Gibraltar</option>
                                        <option value="Great Britain">Great Britain</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Greenland">Greenland</option>
                                        <option value="Grenada">Grenada</option>
                                        <option value="Guadeloupe">Guadeloupe</option>
                                        <option value="Guam">Guam</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Guyana">Guyana</option>
                                        <option value="Haiti">Haiti</option>
                                        <option value="Hawaii">Hawaii</option>
                                        <option value="Honduras">Honduras</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="Hungary">Hungary</option>
                                        <option value="Iceland">Iceland</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="India">India</option>
                                        <option value="Iran">Iran</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="Isle of Man">Isle of Man</option>
                                        <option value="Israel">Israel</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Jamaica">Jamaica</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Kiribati">Kiribati</option>
                                        <option value="Korea North">Korea North</option>
                                        <option value="Korea Sout">Korea South</option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                        <option value="Laos">Laos</option>
                                        <option value="Latvia">Latvia</option>
                                        <option value="Lebanon">Lebanon</option>
                                        <option value="Lesotho">Lesotho</option>
                                        <option value="Liberia">Liberia</option>
                                        <option value="Libya">Libya</option>
                                        <option value="Liechtenstein">Liechtenstein</option>
                                        <option value="Lithuania">Lithuania</option>
                                        <option value="Luxembourg">Luxembourg</option>
                                        <option value="Macau">Macau</option>
                                        <option value="Macedonia">Macedonia</option>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Malta">Malta</option>
                                        <option value="Marshall Islands">Marshall Islands</option>
                                        <option value="Martinique">Martinique</option>
                                        <option value="Mauritania">Mauritania</option>
                                        <option value="Mauritius">Mauritius</option>
                                        <option value="Mayotte">Mayotte</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Midway Islands">Midway Islands</option>
                                        <option value="Moldova">Moldova</option>
                                        <option value="Monaco">Monaco</option>
                                        <option value="Mongolia">Mongolia</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Nambia">Nambia</option>
                                        <option value="Nauru">Nauru</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Netherland Antilles">Netherland Antilles</option>
                                        <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                        <option value="Nevis">Nevis</option>
                                        <option value="New Caledonia">New Caledonia</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="Nicaragua">Nicaragua</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Niue">Niue</option>
                                        <option value="Norfolk Island">Norfolk Island</option>
                                        <option value="Norway">Norway</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Palau Island">Palau Island</option>
                                        <option value="Palestine">Palestine</option>
                                        <option value="Panama">Panama</option>
                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Phillipines">Philippines</option>
                                        <option value="Pitcairn Island">Pitcairn Island</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Puerto Rico">Puerto Rico</option>
                                        <option value="Qatar">Qatar</option>
                                        <option value="Republic of Montenegro">Republic of Montenegro</option>
                                        <option value="Republic of Serbia">Republic of Serbia</option>
                                        <option value="Reunion">Reunion</option>
                                        <option value="Romania">Romania</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="St Barthelemy">St Barthelemy</option>
                                        <option value="St Eustatius">St Eustatius</option>
                                        <option value="St Helena">St Helena</option>
                                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                        <option value="St Lucia">St Lucia</option>
                                        <option value="St Maarten">St Maarten</option>
                                        <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                        <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                        <option value="Saipan">Saipan</option>
                                        <option value="Samoa">Samoa</option>
                                        <option value="Samoa American">Samoa American</option>
                                        <option value="San Marino">San Marino</option>
                                        <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Syria">Syria</option>
                                        <option value="Tahiti">Tahiti</option>
                                        <option value="Taiwan">Taiwan</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tokelau">Tokelau</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Erimates">United Arab Emirates</option>
                                        <option value="United States of America">United States of America</option>
                                        <option value="Uraguay">Uruguay</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option value="Vatican City State">Vatican City State</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                        <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                        <option value="Wake Island">Wake Island</option>
                                        <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                        <option value="Yemen">Yemen</option>
                                        <option value="Zaire">Zaire</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                    </select>
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>About:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <div className="text-editor-wrapper">
                                        {/* new  editor draff will adding */}
                                        <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Advance:</h5>
                        <div className="customize-cmn-wrapper">
                            <div className="switch-para-wrap">
                                <h6>Allow people to follow you</h6>
                                <p>Followers will be notifiles about post you make to your profile and see them in their
                                    home
                                    feed</p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-2" />
                                    <label htmlFor="switch-2"></label>
                                </div>
                            </div>
                            <div className="switch-para-wrap">
                                <h6>Content visibility</h6>
                                <p>Posts to this profile can appear in <a href="#">r/all</a> and your profile can be
                                    discobered
                                    in <a href="#">/users</a></p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-4" />
                                    <label htmlFor="switch-4"></label>
                                </div>
                            </div>
                            <div className="switch-para-wrap">
                                <h6>Active in communities visibility</h6>
                                <p>Show which communities i am active in on my profile</p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-5" />
                                    <label htmlFor="switch-5"></label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Profile Moderation</h5>
                        <div className="customize-cmn-wrapper">
                            <div className="switch-para-wrap">
                                <p className="moderation-para">For moderation tools please visit our <a href="#"
                                        className="underline">Profile Moderation
                                        page</a></p>
                            </div>
                        </div>
                    </div> */}

                    <div className="save-change-rw text-end">

                        <a href="/" onClick={(event) => updateProfile(event)} className="btn primary-bg proxima-bold effect-one"

                            disabled={!(userName &&
                                firstName && lastName)}

                        >Save Changes</a>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default EditProfile;
