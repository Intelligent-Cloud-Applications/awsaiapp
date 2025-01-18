import React from 'react';

const Country = () => {
  return (
    <>
      <option data-countryCode="IN" value="91">
        India (+91)
      </option>
      <option data-countryCode="US" value="1">
        USA (+1)
      </option>
      <optgroup label="Other countries">
        <option data-countryCode="GB" value="44">UK (+44)</option>
        <option data-countryCode="CA" value="1">Canada (+1)</option>
        <option data-countryCode="AU" value="61">Australia (+61)</option>
        <option data-countryCode="SG" value="65">Singapore (+65)</option>
        <option data-countryCode="AE" value="971">UAE (+971)</option>
        <option data-countryCode="DE" value="49">Germany (+49)</option>
        <option data-countryCode="FR" value="33">France (+33)</option>
        <option data-countryCode="JP" value="81">Japan (+81)</option>
        <option data-countryCode="CN" value="86">China (+86)</option>
        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
      </optgroup>
    </>
  );
};

export default Country; 