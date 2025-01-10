import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const RoleCard = ({ title, icon, onClick }) => {
  return (
    <Card 
      className="w-56 h-48 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 bg-blue-600 text-white hover:bg-blue-800 bg-opacity-80 hover:bg-opacity-100"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center">
        {icon}
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      </CardContent>
    </Card>
  );
};

export default RoleCard;

