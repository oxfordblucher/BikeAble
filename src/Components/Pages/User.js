import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function User() {
                return(
                    <React.Fragment>
                

<h1>
  Welcome to BikeAble
  <small class="text-muted">insert username</small>
</h1>


<h2>Store cycling equipment</h2>
<div class="row"/>
  
  <div class="col"/>
    <input type="text" class="form-control" placeholder="Bike Manufacturer" aria-label="Frame Name"/>
  <div/>
<div/>

<div class="Road-bike"/>
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
  <label class="form-check-label" for="exampleRadios1">
    Road Bike
  </label>
<div/>
<div class="Gravel-Bike"/>
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
  <label class="form-check-label" for="exampleRadios2">
    Gravel Bike
  </label>
<div/>
<div class="Mountain-Bike"/>
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3"/>
  <label class="form-check-label" for="exampleRadios3">
    Mountain Bike
  </label>
<div/>
<button type="setupButton" class="btn btn-primary">Enter Setup</button>


</React.Fragment>
                
)}

