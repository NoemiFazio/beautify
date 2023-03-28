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
