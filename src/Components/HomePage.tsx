import React from "react";
import { Link } from "react-router-dom";
import fysioKlikker from "../clinicsData";
import { slugify } from "../utils/slugify";

const HomePage: React.FC = () => {
  const suburbCounts = fysioKlikker.reduce((acc, clinic) => {
    acc[clinic.lokation] = (acc[clinic.lokation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalClinics = fysioKlikker.length;

  return (
    <div>
      <div className="bg-primary-blue text-white py-20 px-0 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find den bedste fysioterapeut
          </h1>
          <p className="text-xl">
            Vi har information fra {totalClinics} danske klinikker. Hvor leder
            du efter en fys?
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(suburbCounts).map(([suburb, count]) => (
            <li key={suburb}>
              <Link
                to={`/${slugify(suburb)}`}
                className="block border p-6 rounded-md hover:shadow-lg transition-shadow duration-200 h-full"
              >
                <span className="text-2xl font-bold text-slate-800 block mb-2">
                  {suburb}
                </span>
                <span className="text-slate-600">{count} klinikker</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
