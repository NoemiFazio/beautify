const BASE_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

const GET = async (brand = "", type = "") => {
  // const res = await fetch(
  //   BASE_URL + "?brand=" + brand + "&product_type=" + type
  // );
  // return await res.json();

  const url = BASE_URL + "?brand=" + brand + "&product_type=" + type;
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();
  return data;
};

export { GET };

// http://api.weatherstack.com/current?access_key=5e5e89fe7b4c26e59924104c78fd4f07&query=New%20York&units=m
