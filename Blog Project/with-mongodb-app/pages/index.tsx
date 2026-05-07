"use client"

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type ConnectionStatus = {
  isConnected: boolean;
};

var database;
var blogPosts;

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    database = await client.db('blogposts');
    blogPosts = await database.collection("blog").find({}, {projection:{_id: 0}}).toArray();
    return {
      props: { isConnected: true, blogPosts },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected, blogPosts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <main>
      <title>
        BlogProject
      </title>
      <link rel="icon" type="image/x-icon" href="BlogProject Icon.png"/>
      <div className="header">
        <img src="BlogProject Logo.png" alt="BlogProject" width="600" height="400"/>
      </div>
      <div className="splashText">
        <h1>
          It's What You Make Of It.
        </h1>
      </div>
      <div className="mainBox">
        <div className="container">
          <h2>Welcome to BlogProject!</h2>
          <h5>This is what it looks like when nothing has been changed.</h5>
          <h5>Published...uh...never?</h5>
          <div className="mainImage">
          <img src="BlogProject Logo.png" alt="The BlogProject logo!" width="600" height="400"/>
          </div>
          To add your own blog posts and such, add your MongoDB and edit index.tsx! Have fun blogging!
          </div>
      </div>
      <div className="footer">
        <p>Last updated: 2026-5-6; 10:09PM</p>
      </div>
    </main>
  );
}
