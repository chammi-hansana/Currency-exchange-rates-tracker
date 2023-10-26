import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // the states for the fields
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const [sourceCurrencyName, setsourceCurrencyName] = useState("");
  const [targetCurrencyName, settargetCurrencyName] = useState("");
  const [currencyNames, setcurrencyNames] = useState([]);
  const [pressed, setPressed] = useState(false);
  
  

  //get all the currencies
  useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setcurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTheCurrencies();
  }, []);

  // onSubmit
  const getTheTargetAmount = async (event) => {
    event.preventDefault();
    setPressed(true);
    // send the data
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      const { amountInTargetCurrency } = responce.data;
      
      //currencyNames
      const { sourceCurrencyName, targetCurrencyName } = responce.data;
      setsourceCurrencyName(sourceCurrencyName);
      settargetCurrencyName(targetCurrencyName);
      setamountInTargetCurrency(amountInTargetCurrency);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="lg:mx-32  text-5xl font-black flex items-center justify-normal text-violet-500">
      Currency Conversion Made Easy. Start Today
      </h1>
      <p className="lg:mx-32 font-sm opacity-40 py-6">
      Explore the World of Currency Conversion with Ease. Get Started Now! With this platform, effortlessly convert currencies using up-to-date exchange rates. 
      Whether you're preparing for a journey, organizing your finances, or just intrigued by the worth of your money in various currencies, our tool is at your service.
      </p>
      <div className=" mt-8 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={getTheTargetAmount}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="date"
              >
                Date
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                onChange={(e) => Setdate(e.target.value)}
                type="date"
                name="date"
                id="date"
                placeholder="date.."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="sourceCurrency"
              >
                Source Currency
              </label>

              <select
                value={sourceCurrency} // Set the selected value
                onChange={(e) => setsourceCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                name="sourceCurrency"
                id="sourceCurrency"
              >
                <option value="">Select source currency</option>{" "}
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="targetCurrency"
              >
                Target Currency
              </label>
              <select
                value={targetCurrency} // Set the selected value
                onChange={(e) => settargetCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                name="sourceCurrency"
                id="sourceCurrency"
              >
                <option value="">Select target currency</option>{" "}
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="amountInSourceCurrency"
              >
                Amount in source currency
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                onChange={(e) => setamountInSourceCurrency(e.target.value)}
                type="number"
                name="amountInSourceCurrency"
                id="amountInSourceCurrency"
                placeholder="Amount in source currency..."
              />
            </div>

            <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-3">
              Get the target Currency
            </button>
          </form>


        </section>
        <h3 className=" flex items-center justify-start py-5 text-lg">
          {pressed ? (
            <div>
              <span className=" text-xl"> {amountInSourceCurrency}</span>{" "}
              {sourceCurrencyName} is equal to
              <span className=" text-xl font-bold text-violet-400">
                {" "}
                {amountInTargetCurrency.toFixed(2)}
              </span>{" "}
              {targetCurrencyName[targetCurrency]}
            </div>
          ) : (
            ""
          )}
        </h3>
      </div>
    </div>
  );
}

export default App;
