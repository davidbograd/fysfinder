import React, { useState } from "react";
import { useParams } from "react-router-dom";
import fysioKlikker from "../clinicsData";
import IconEmail from "./Icons/IconEmail";
import IconPhone from "./Icons/IconPhone";
import { slugify } from "../utils/slugify";
import Breadcrumbs from "./Breadcrumbs";
import { FaUser, FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import GoogleMap from "./GoogleMap";

// Define Clinic type inline
type Clinic = (typeof fysioKlikker)[number];

const ClinicDetailsPage: React.FC = () => {
  const [showAllTherapists, setShowAllTherapists] = useState(false);
  const { suburb, clinicName } = useParams<{
    suburb: string;
    clinicName: string;
  }>();

  const clinic = fysioKlikker.find(
    (c): c is Clinic =>
      slugify(c.lokation) === suburb && slugify(c.klinikNavn) === clinicName
  );

  if (!clinic) {
    return <div className="text-center mt-10">Clinic not found</div>;
  }

  const breadcrumbItems = [
    { text: "Forside", link: "/" },
    { text: clinic.lokation, link: `/${suburb}` },
    { text: clinic.klinikNavn },
  ];

  const generateTherapists = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      name: `Therapist Name ${index + 1}`,
      specialty: `Speciality ${index + 1}`,
    }));
  };

  const therapistCount = parseInt(clinic.antalBehandlere, 10) || 0;
  const therapists = generateTherapists(therapistCount);
  const displayedTherapists = showAllTherapists
    ? therapists
    : therapists.slice(0, 5);

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-3xl font-bold mb-2">{clinic.klinikNavn}</h1>
      <div className="flex items-center mb-6">
        <FaStar className="text-yellow-500 mr-2" />
        <span className="font-bold mr-2">{clinic.avgRating.toFixed(1)}</span>
        <span className="text-gray-500">
          ({clinic.ratingCount} anmeldelser)
        </span>
      </div>

      <div className="mb-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <p>
              {clinic.adresse}, {clinic.lokation}
            </p>
          </div>
          <div className="flex items-center">
            <FaGlobe className="mr-2" />
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {clinic.website}
            </a>
          </div>
          <div className="flex items-center">
            <IconPhone />
            <span>{clinic.tlf}</span>
          </div>
          <div className="flex items-center">
            <IconEmail />
            <span>{clinic.email}</span>
          </div>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-40 rounded-lg"></div>
        ))}
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Priser</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex-grow pr-4 max-w-[calc(100%-120px)]">
                Første konsult (60 min)
              </span>
              <span className="font-semibold">{clinic.førsteKons} kr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex-grow pr-4 max-w-[calc(100%-120px)]">
                Standard konsult (60 min)
              </span>
              <span className="font-semibold">{clinic.opfølgning} kr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex-grow pr-4 max-w-[calc(100%-120px)]">
                Andet (30 min)
              </span>
              <span className="font-semibold">300 kr</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Åbningstider</h2>
          <div className="space-y-2">
            {[
              "Mandag",
              "Tirsdag",
              "Onsdag",
              "Torsdag",
              "Fredag",
              "Lørdag",
              "Søndag",
            ].map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span>{day}</span>
                <span className="font-semibold">
                  {clinic[day.toLowerCase() as keyof typeof clinic]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Behandlere {therapistCount > 0 && `(${therapistCount})`}
        </h2>
        {therapistCount > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedTherapists.map((therapist, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div className="bg-gray-200 w-[120px] h-[120px] rounded-lg mr-4 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-5xl" />
                  </div>
                  <div>
                    <p className="font-semibold">{therapist.name}</p>
                    <p className="text-gray-600">{therapist.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
            {therapists.length > 5 && !showAllTherapists && (
              <button
                className="text-blue-600 hover:text-blue-800 underline font-medium mt-4 mr-4"
                onClick={() => setShowAllTherapists(true)}
              >
                Vis flere
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-600 italic">
            Vi har ikke data på denne kliniks behandlere.
          </p>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Jeg er behandler her, tilføj
        </button>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Andet</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="w-3/5">Parkering</span>
            <span className="w-2/5 text-right font-semibold">
              {clinic.parkering}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3/5">Handicap adgang</span>
            <span className="w-2/5 text-right font-semibold">
              {clinic.handicapadgang}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3/5">Holdtræning</span>
            <span className="w-2/5 text-right font-semibold">
              {clinic.holdtræning}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3/5">Hjemmetræning</span>
            <span className="w-2/5 text-right font-semibold">
              {clinic.hjemmetræning}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Lokation</h2>
        <GoogleMap address={`${clinic.adresse}, ${clinic.lokation}`} />
      </div>
    </div>
  );
};

export default ClinicDetailsPage;
