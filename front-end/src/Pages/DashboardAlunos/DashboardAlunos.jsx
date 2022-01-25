import React, { useState } from 'react';
import Sidebar from '../../Components/sideBar/SideBar';
import Provas from '../Provas';
import { BsFillHouseDoorFill} from "react-icons/bs";


export default function DashboardAlunos() {
    const [view, setView] = useState(0);


    const data = [
        { name: 'Provas', id: 0, icon: <BsFillHouseDoorFill /> },
    ]

    var arrayLink = [
        <Provas />
    ]
  return (
      <Sidebar data={data} func={setView} dashboard={arrayLink[view]}/>
  );
}
