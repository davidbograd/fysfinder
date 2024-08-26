import React from "react";
import { useParams, Link } from "react-router-dom";
import fysioKlikker from "../clinicsData";
import ClinicCard from "./ClinicCard";
import { slugify } from "../utils/slugify";
import Breadcrumbs from "./Breadcrumbs";

const SuburbPage: React.FC = () => {
  const { suburb } = useParams<{ suburb: string }>();
  const clinics = fysioKlikker.filter(
    (clinic) => slugify(clinic.lokation) === suburb
  );
  const suburbName = clinics[0]?.lokation || suburb;

  const breadcrumbItems = [
    { text: "Forside", link: "/" },
    { text: suburbName || "Unknown Suburb" },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold mb-6">
        {clinics.length} bedste fysioterapeuter på {suburbName}
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clinics.map((clinic, index) => (
          <Link
            key={index}
            to={`/${suburb}/clinic/${slugify(clinic.klinikNavn)}`}
          >
            <ClinicCard {...clinic} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuburbPage;
