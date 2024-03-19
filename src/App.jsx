import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [startMovies, setStartMovies] = useState();
  const [searchValue, setSearchValue] = useState();
  const [autorSearchValue, setAutorSearchValue] = useState();
  const [categorySearchValue, setCategorySearchValue] = useState();

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`)
      .then((res) => {
        setStartMovies(res.data.items);
      });
  }, []);


  const clickHandler = () => {
    const searchArr = searchValue.split(/\s+/).join("+");
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchArr}`)
      .then((res) => {
        setStartMovies(res.data.items);
      });
  };

  const authorHandler = () => {
    const searchArr = autorSearchValue.split(/\s+/).join("+");
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchArr}`)
      .then((res) => {
        setStartMovies(res.data.items);
      });
  }


  const categoryHandler = () => {
    const searchArr = categorySearchValue.split(/\s+/).join("+");
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchArr}`)
      .then((res) => {
        setStartMovies(res.data.items);
      });
  }


  return (
    <div>
      <div className="h-24 bg-cyan-900 px-12 py-7">
        <h1 className="text-white text-3xl font-bold">Books</h1>
      </div>
      <div className="flex justify-between px-16">
        <div>
          <input
            onChange={(e) => {
              setSearchValue(e.target.value.toLowerCase());
            }}
            placeholder="search book..."
            type="text"
            className=" px-10 my-20 me-8 py-2  outline-none border  "
          />
          <button
            onClick={clickHandler}
            className="bg-sky-900	py-2 rounded text-white px-3"
          >
            Search
          </button>
        </div>
        <div>
          <input
            onChange={(e) => {
              setAutorSearchValue(e.target.value.toLowerCase());
            }}
            placeholder="search autor..."
            type="text"
            className="ms-16 me-8 px-10 my-20 py-2  outline-none border  "
          />
          <button
            onClick={authorHandler}
            className="bg-sky-900	py-2 rounded text-white px-3"
          >
            Search
          </button>
        </div>
        <div>
          <input
            onChange={(e) => {
              setCategorySearchValue(e.target.value.toLowerCase());
            }}
            placeholder="search category..."
            type="text"
            className="ms-16 me-8 px-10 my-20 py-2  outline-none border  "
          />
          <button
            onClick={categoryHandler}
            className="bg-sky-900	py-2 rounded text-white px-3"
          >
            Search
          </button>
        </div>
      </div>

      <div className="w-100 px-10 grid gap-4 grid-cols-4 grid-rows-4">
        {startMovies &&
          startMovies.map((item, index) => {
            return (
              <div
                className="flex flex-col gap-4 m-5 bg-sky-300 rounded	p-3 "
                key={index}
              >
                <div className="flex flex-row gap-3">
                  <h1 className=""><span className="font-bold">title:</span> {item.volumeInfo.title}</h1>
                  <img
                    src={
                      item.volumeInfo.imageLinks &&
                      item.volumeInfo.imageLinks.thumbnail
                    }
                    alt=""
                  />
                </div>
                <p>
                  <span className="font-bold">Authors:</span> {item.volumeInfo.authors && item.volumeInfo.authors}
                </p>
                <p>
                  <span className="font-bold">Description:</span>
                  {item.volumeInfo.description &&
                    item.volumeInfo.description.slice(0, 170)}
                </p>
                <p><span className="font-bold">Category:</span> {item.volumeInfo.categories}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
