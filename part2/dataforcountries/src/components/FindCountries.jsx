const FindCountries = ({ country, onCountryChange, isDisabled }) => {
  return (
    <>
      <p>
        find countries <input value={country} onChange={onCountryChange} disabled={isDisabled} />
      </p>
    </>
  )
};

export default FindCountries;