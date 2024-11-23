'use client';

import React from 'react';
import Image from "next/image";
import ButterSection from "@/components/buttersection";
import Head from 'next/head';
import Hero from '@/components/home/hero';
import Footer from '@/components/home/footer';


export default function Home() {
  return (
    <div className="z-0 -mt-20 flex flex-col min-h-screen">
      <ButterSection>
      <Head>
        <title>Butter - Blockchain Events</title>
        <meta name="description" content="Discover and join exclusive blockchain events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <Hero />
      </main>

      <Footer />
    </ButterSection>
    </div>
  );
}
