import Calender from '@/components/scheduleComponents/Calender';
import Routine from '@/components/scheduleComponents/Routine';

import React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Schedule = () => {
    return (
        <Card className="w-full max-w-5xl mx-auto mt-6 shadow-xl rounded-2xl">
      <CardContent className="p-6">

        <Tabs defaultValue="routine" className="w-full">
          {/* Tab buttons */}
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="routine">Routine</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Tab contents */}
          <TabsContent value="routine">
            <Routine />
          </TabsContent>

          <TabsContent value="calendar">
            <Calender />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    );
};

export default Schedule;