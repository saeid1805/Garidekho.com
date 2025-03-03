import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Car,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  Upload,
  PlusCircle,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";

interface DealerPortalProps {
  dealerName?: string;
  dealerLogo?: string;
}

const DealerPortal = ({
  dealerName = "Tesla Motors SF",
  dealerLogo = "https://api.dicebear.com/7.x/initials/svg?seed=TM",
}: DealerPortalProps) => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for inventory
  const inventory = [
    {
      id: "car-1",
      title: "2023 Tesla Model 3 Long Range",
      price: 42990,
      status: "active",
      condition: "new",
      views: 245,
      leads: 12,
      dateAdded: "2023-06-15",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    },
    {
      id: "car-2",
      title: "2022 Tesla Model Y Performance",
      price: 56990,
      status: "active",
      condition: "new",
      views: 189,
      leads: 8,
      dateAdded: "2023-06-10",
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "car-3",
      title: "2021 Tesla Model S Plaid",
      price: 89990,
      status: "pending",
      condition: "used",
      views: 320,
      leads: 15,
      dateAdded: "2023-05-28",
      image:
        "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "car-4",
      title: "2022 Tesla Model X Long Range",
      price: 79990,
      status: "sold",
      condition: "used",
      views: 275,
      leads: 18,
      dateAdded: "2023-05-15",
      image:
        "https://images.unsplash.com/photo-1553260168-69b041873e65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Mock data for leads
  const leads = [
    {
      id: "lead-1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      interest: "2023 Tesla Model 3 Long Range",
      status: "new",
      date: "2023-06-18",
      message:
        "I'm interested in scheduling a test drive for the Model 3. Is it available this weekend?",
    },
    {
      id: "lead-2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      interest: "2022 Tesla Model Y Performance",
      status: "contacted",
      date: "2023-06-17",
      message:
        "Looking for financing options on the Model Y. Can you send me information about current rates?",
    },
    {
      id: "lead-3",
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "(555) 456-7890",
      interest: "2021 Tesla Model S Plaid",
      status: "qualified",
      date: "2023-06-15",
      message:
        "I'd like to know about the trade-in value for my current vehicle if I purchase the Model S Plaid.",
    },
    {
      id: "lead-4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 234-5678",
      interest: "2022 Tesla Model X Long Range",
      status: "closed",
      date: "2023-06-10",
      message:
        "Can you provide more details about the warranty coverage for the Model X?",
    },
  ];

  // Filter inventory based on search and status
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter leads based on search
  const filteredLeads = leads.filter((lead) => {
    return (
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interest.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-purple-100 text-purple-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "qualified":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100">
                <img
                  src={dealerLogo}
                  alt={dealerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {dealerName}
                </h1>
                <p className="text-sm text-gray-500">Dealer Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                <Badge className="ml-2 bg-blue-600">3</Badge>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
                <Badge className="ml-2 bg-blue-600">2</Badge>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Inventory</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inventory.length}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Leads</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {leads.length}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inventory.reduce((sum, item) => sum + item.views, 0)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (inventory.reduce((sum, item) => sum + item.leads, 0) /
                        inventory.reduce((sum, item) => sum + item.views, 0)) *
                        100,
                    )}
                    %
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="inventory"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white">
              <TabsTrigger value="inventory" className="px-6">
                Inventory
              </TabsTrigger>
              <TabsTrigger value="leads" className="px-6">
                Leads
              </TabsTrigger>
              <TabsTrigger value="analytics" className="px-6">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="px-6">
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {activeTab === "inventory" && (
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="inventory" className="mt-0">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Vehicle Inventory</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        filterStatus === "all"
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }
                      onClick={() => setFilterStatus("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        filterStatus === "active"
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }
                      onClick={() => setFilterStatus("active")}
                    >
                      Active
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        filterStatus === "pending"
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }
                      onClick={() => setFilterStatus("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        filterStatus === "sold"
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }
                      onClick={() => setFilterStatus("sold")}
                    >
                      Sold
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Vehicle
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Price
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Views
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Leads
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Date Added
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.length > 0 ? (
                        filteredInventory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded overflow-hidden mr-3">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.condition === "new" ? "New" : "Used"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium">
                              ${item.price.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`${getStatusColor(item.status)}`}
                              >
                                {item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{item.views}</td>
                            <td className="py-3 px-4">{item.leads}</td>
                            <td className="py-3 px-4">{item.dateAdded}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-6 text-center text-gray-500"
                          >
                            No vehicles found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="mt-0">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Leads</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Lead
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Name
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Contact
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Interest
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                          <div className="flex items-center">
                            Date
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <p className="font-medium text-gray-900">
                                {lead.name}
                              </p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-gray-900">{lead.email}</p>
                              <p className="text-sm text-gray-500">
                                {lead.phone}
                              </p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-gray-900 line-clamp-1">
                                {lead.interest}
                              </p>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`${getStatusColor(lead.status)}`}
                              >
                                {lead.status.charAt(0).toUpperCase() +
                                  lead.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{lead.date}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-6 text-center text-gray-500"
                          >
                            No leads found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Analytics dashboard would be displayed here
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Showing inventory performance, lead conversion, and market
                      trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Dealer Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Dealer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dealer Name
                        </label>
                        <Input defaultValue={dealerName} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input defaultValue="info@teslamotorssf.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input defaultValue="(415) 555-1234" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <Input defaultValue="https://www.teslamotorssf.com" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Dealer Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <Input defaultValue="123 Market Street" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input defaultValue="San Francisco" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input defaultValue="CA" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <Input defaultValue="94105" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <Input defaultValue="United States" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monday - Friday
                        </label>
                        <Input defaultValue="9:00 AM - 7:00 PM" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Saturday
                        </label>
                        <Input defaultValue="10:00 AM - 6:00 PM" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sunday
                        </label>
                        <Input defaultValue="11:00 AM - 5:00 PM" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DealerPortal;
