import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, MapPin, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QRLocation {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number];
  qrCode: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const [locations, setLocations] = useState<QRLocation[]>([
    {
      id: '1',
      name: 'Central Park Waste Station',
      type: 'Waste Bin',
      coordinates: [12.9716, 77.5946],
      qrCode: 'QR001-CENTRAL-PARK',
      description: 'Large capacity waste station with recycling facilities',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Metro Plaza Restroom',
      type: 'Restroom',
      coordinates: [12.9756, 77.5996],
      qrCode: 'QR002-METRO-PLAZA',
      description: 'Clean public restroom with accessibility features',
      status: 'active',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-22'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    coordinates: ['', ''],
    description: ''
  });

  const generateQRCode = (name: string, type: string) => {
    const prefix = type.toUpperCase().slice(0, 3);
    const suffix = name.toUpperCase().replace(/\s+/g, '-').slice(0, 10);
    return `QR${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${prefix}-${suffix}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLocation: QRLocation = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      coordinates: [parseFloat(formData.coordinates[0]), parseFloat(formData.coordinates[1])],
      qrCode: generateQRCode(formData.name, formData.type),
      description: formData.description,
      status: 'active',
      createdAt: editingId ? locations.find(l => l.id === editingId)?.createdAt || '' : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingId) {
      setLocations(locations.map(l => l.id === editingId ? newLocation : l));
    } else {
      setLocations([...locations, newLocation]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      coordinates: ['', ''],
      description: ''
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (location: QRLocation) => {
    setFormData({
      name: location.name,
      type: location.type,
      coordinates: [location.coordinates[0].toString(), location.coordinates[1].toString()],
      description: location.description
    });
    setEditingId(location.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  const toggleStatus = (id: string) => {
    setLocations(locations.map(l => 
      l.id === id 
        ? { ...l, status: l.status === 'active' ? 'inactive' : 'active', updatedAt: new Date().toISOString().split('T')[0] }
        : l
    ));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="display-large mb-4">Admin Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Manage QR codes and location assignments for your urban facilities
              </p>
            </div>
            
            <Button 
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Location
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Locations</p>
                  <p className="text-3xl font-bold">{locations.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active QR Codes</p>
                  <p className="text-3xl font-bold">{locations.filter(l => l.status === 'active').length}</p>
                </div>
                <QrCode className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Categories</p>
                  <p className="text-3xl font-bold">{new Set(locations.map(l => l.type)).size}</p>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">📋</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <p className="text-3xl font-bold">+{Math.floor(Math.random() * 20) + 5}</p>
                </div>
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-500">📈</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="glass-intense">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{editingId ? 'Edit Location' : 'Add New Location'}</span>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g., Central Park Waste Station"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <Input
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        placeholder="e.g., Waste Bin, Restroom, Food Stall"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Coordinates</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          step="any"
                          value={formData.coordinates[0]}
                          onChange={(e) => setFormData({...formData, coordinates: [e.target.value, formData.coordinates[1]]})}
                          placeholder="Latitude"
                          required
                        />
                        <Input
                          type="number"
                          step="any"
                          value={formData.coordinates[1]}
                          onChange={(e) => setFormData({...formData, coordinates: [formData.coordinates[0], e.target.value]})}
                          placeholder="Longitude"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Input
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Brief description of the facility"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-primary">
                      <Save className="w-4 h-4 mr-2" />
                      {editingId ? 'Update' : 'Create'} Location
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Locations Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Location Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 rounded-2xl border"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{location.name}</h3>
                          <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                            {location.status}
                          </Badge>
                          <Badge variant="outline">{location.type}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{location.description}</p>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">QR Code:</span>
                            <p className="font-mono text-primary">{location.qrCode}</p>
                          </div>
                          <div>
                            <span className="font-medium">Coordinates:</span>
                            <p>{location.coordinates[0]}, {location.coordinates[1]}</p>
                          </div>
                          <div>
                            <span className="font-medium">Last Updated:</span>
                            <p>{location.updatedAt}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(location.id)}
                        >
                          {location.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(location)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(location.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;