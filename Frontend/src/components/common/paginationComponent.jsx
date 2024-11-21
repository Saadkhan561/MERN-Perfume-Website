import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Pagination = ({ pages, skip, setSkip }) => {
  const [active, setActive] = useState(0);
  const totalPages = pages;

  console.log("skip", skip);

  useEffect(() => {
    setSkip(active*2)
  }, [active, setSkip])

  const handlePrevious = () => {
    if (active > 0) {
      setActive(active - 1);
      setSkip(skip - 10);
    }
  };

  const handleNext = () => {
    if (active < totalPages - 1) {
      setActive(active + 1);
      setSkip(skip + 10);
    }
  };

  return (
    <div className=" p-1 flex gap-6 items-center">
      <button onClick={handlePrevious}>
        <ChevronLeft size={20} color="black" />
      </button>
      {pages ? (
        <div className="flex gap-2 items-center">
          {/* First Page Indicator */}
          {active > 1 && (
            <>
              <button onClick={() => setActive(0)} className="px-2 text-black">
                1
              </button>
              <span className="text-gray-500">{"<<"}</span>
            </>
          )}

          {/* Current, Previous, and Next Pages */}
          {Array.from({ length: totalPages })
            .map((_, index) => index)
            .filter(
              (index) =>
                index === active || index === active - 1 || index === active + 1
            )
            .map((index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`px-2 text-black ${
                  active === index ? "bg-slate-100 rounded-sm" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

          {/* Last Page Indicator */}
          {active < totalPages - 2 && (
            <>
              <span className="text-gray-500">{">>"}</span>
              <button
                onClick={() => setActive(totalPages - 1)}
                className="px-2 text-black"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      ) : (
        <ClipLoader size={15} color="black" />
      )}
      <button onClick={handleNext}>
        <ChevronRight size={20} color="black" />
      </button>
    </div>
  );
};

export default Pagination;
