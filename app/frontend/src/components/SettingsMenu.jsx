import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';

const SettingsMenu = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [vibrationEnabled, setVibrationEnabled] = useState(() => {
    const saved = localStorage.getItem('vibrationEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('vibrationEnabled', JSON.stringify(vibrationEnabled));
  }, [vibrationEnabled]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity duration-300"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your preferences
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="sound" className="flex-1 cursor-pointer">
              <div className="font-medium">Sound Effects</div>
              <div className="text-sm text-muted-foreground">Play sound when generating numbers</div>
            </Label>
            <Switch
              id="sound"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="vibration" className="flex-1 cursor-pointer">
              <div className="font-medium">Vibration</div>
              <div className="text-sm text-muted-foreground">Vibrate when generating numbers</div>
            </Label>
            <Switch
              id="vibration"
              checked={vibrationEnabled}
              onCheckedChange={setVibrationEnabled}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsMenu;

export const getSettings = () => {
  const soundEnabled = localStorage.getItem('soundEnabled');
  const vibrationEnabled = localStorage.getItem('vibrationEnabled');
  
  return {
    soundEnabled: soundEnabled !== null ? JSON.parse(soundEnabled) : true,
    vibrationEnabled: vibrationEnabled !== null ? JSON.parse(vibrationEnabled) : true
  };
};
