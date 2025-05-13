import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { X } from 'lucide-react'

export default function SwitchManagementInterface() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [switchType, setSwitchType] = useState("Edge_Core")
  const [ipAddress, setIpAddress] = useState("192.168.")
  const [portNumber, setPortNumber] = useState("")
  const [portDescription, setPortDescription] = useState("")
  const [vlanId, setVlanId] = useState("")
  const [commandOutput, setCommandOutput] = useState("")

  // Mock functions for backend calls
  const handleMvrGroups = () => {
    // Backend call would go here
    setCommandOutput("MVR Groups command executed")
  }

  const handleReboot = () => {
    // Backend call would go here
    setCommandOutput("Reboot command sent to switch")
  }

  const handleCommutInfo = () => {
    // Backend call would go here
    setCommandOutput("Retrieved commutation information")
  }

  const handleClearCommand = () => {
    setCommandOutput("")
  }

  const handleTest = () => {
    setCommandOutput(`Testing connection to ${ipAddress}...`)
    // Backend call would go here
  }

  return (
    <Card className="max-w-4xl mx-auto my-4 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl">Allin</CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Login Section */}
          <div className="col-span-1">
            <Input placeholder="albiruni" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="col-span-1">
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={handleMvrGroups}>
              MVR Groups
            </Button>
          </div>
        </div>

        {/* Switch Type Selection */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <RadioGroup value={switchType} onValueChange={setSwitchType} className="space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Edge_Core" id="Edge_Core" />
                <Label htmlFor="Edge_Core">Edge_Core</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Eltex" id="Eltex" />
                <Label htmlFor="Eltex">Eltex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Dlink" id="Dlink" />
                <Label htmlFor="Dlink">Dlink</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="col-span-1 flex items-start">
            <Button
              className="bg-blue-300 hover:bg-blue-400 text-black"
              onClick={() => setCommandOutput("What? button clicked")}
            >
              What?
            </Button>
          </div>
          <div className="col-span-1">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={handleReboot}>
              Reboot
            </Button>
          </div>
        </div>

        {/* IP Address Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
          </div>
          <div className="col-span-1">
            <Input placeholder="" />
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleCommutInfo}>
              Commut Info
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">MAC Table</Button>
          </div>
        </div>

        {/* Port and Description Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Input placeholder="Порт" value={portNumber} onChange={(e) => setPortNumber(e.target.value)} />
          </div>
          <div className="col-span-1">
            <Input
              placeholder="Описание"
              value={portDescription}
              onChange={(e) => setPortDescription(e.target.value)}
            />
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white">Description</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Who IPTV</Button>
          </div>
        </div>

        {/* VLAN Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Input placeholder="Vlan" value={vlanId} onChange={(e) => setVlanId(e.target.value)} />
          </div>
          <div className="col-span-1">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Vlan</Button>
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white">Errors Port</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Clear Errors</Button>
          </div>
        </div>

        {/* Action Buttons Row 1 */}
        <div className="grid grid-cols-4 gap-4">
          <Button className="bg-blue-300 hover:bg-blue-400 text-black">Open + TV</Button>
          <Button className="bg-blue-300 hover:bg-blue-400 text-black">Close port</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleTest}>
            TEST
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Trafic</Button>
        </div>

        {/* Action Buttons Row 2 */}
        <div className="grid grid-cols-4 gap-4">
          <Button className="bg-blue-300 hover:bg-blue-400 text-black">IPTV</Button>
          <Button className="bg-blue-300 hover:bg-blue-400 text-black">Port Security</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">MAC</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Link</Button>
        </div>

        {/* Command Output */}
        <div className="border p-2 min-h-[150px] bg-white">
          <Textarea className="w-full h-full min-h-[150px] border-none resize-none" value={commandOutput} readOnly />
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleClearCommand}>
              Clear CMD
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Clear port</Button>
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Conf</Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Save conf</Button>
          </div>
          <div className="col-span-1 flex justify-end">
            <Button className="bg-gray-200 hover:bg-gray-300 text-black">Clear Text</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
