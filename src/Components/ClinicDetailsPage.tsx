import React from "react";
import { useParams } from "react-router-dom";
import fysioKlikker from "../clinicsData";
import IconEmail from "./Icons/IconEmail";
import IconPhone from "./Icons/IconPhone";
import { slugify } from "../utils/slugify";
import Breadcrumbs from "./Breadcrumbs";
import { FaUser, FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import joachimImage from "../assets/images/joachimbograd-fysiopuls.png";

// Define Clinic type inline
type Clinic = (typeof fysioKlikker)[number];

const ClinicDetailsPage: React.FC = () => {
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

  const therapists = [
    { name: "Joachim Bograd", specialty: "Speciale: Skulder, ryg, lilletå" },
    { name: "Therapist Name 2", specialty: "Speciality 2" },
    { name: "Therapist Name 3", specialty: "Speciality 3" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-4xl font-bold mb-2">{clinic.klinikNavn}</h1>
      <div className="flex items-center mb-6">
        <FaStar className="text-yellow-500 mr-2" />
        <span className="font-bold mr-2">4.8</span>
        <span className="text-gray-500">(50 anmeldelser)</span>
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
          Behandlere ({clinic.antalBehandlere})
        </h2>
        {therapists.map((therapist, index) => (
          <div key={index} className="flex items-center mb-4">
            {therapist.name === "Joachim Bograd" ? (
              <img
                src={joachimImage}
                alt="Joachim Bograd"
                className="w-[120px] h-[120px] rounded-lg mr-4 object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-[120px] h-[120px] rounded-lg mr-4 flex items-center justify-center">
                <FaUser className="text-gray-400 text-5xl" />
              </div>
            )}
            <div>
              <p className="font-semibold">{therapist.name}</p>
              <p className="text-gray-600">{therapist.specialty}</p>
            </div>
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
    </div>
  );
};

export default ClinicDetailsPage;
