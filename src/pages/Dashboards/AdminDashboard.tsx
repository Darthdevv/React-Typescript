import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const BASE_URL: string = "https://jsonplaceholder.typicode.com/";

  const GetUsers = async () => {
    const {data} = await axios.get(`${BASE_URL}/users`);
    setUsers(data);
    console.log(data);
  }

  useEffect(() => {
    GetUsers();
  },[])

  return (
    <Table>
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="text-right">Email</TableHead>
          <TableHead className="text-right">Phone</TableHead>
          <TableHead className="text-right">Website</TableHead>
        </TableRow>
      </TableHeader>
      {users.map((user) => {
        return (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.website}</TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
};

export default AdminDashboard;
