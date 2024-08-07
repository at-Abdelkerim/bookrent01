"use client";

import React, { useActionState, useState } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { authenticate, register } from "../lib/actions";
import { BookRent } from "../components/svg";

export default function Page({}) {
  const [isSignUp, setIsSignUp] = useState(false),
    [agreement, setAgreement] = useState(false),
    [authErrorMessage, authFormAction, authIsPending] = useActionState(
      authenticate,
      undefined
    ),
    [registerErrorMessage, registerFormAction, registerIsPending] =
      useActionState(register, undefined);
  return (
    <div className="grid grid-cols-2 bg-white h-screen">
      <div className="place-content-center grid bg-[#171B36]">
        <BookRent width={400} height={400} fill={"white"} />
      </div>
      <div className="place-content-center grid text-gray-700">
        <form
          action={isSignUp ? registerFormAction : authFormAction}
          className="grid gap-y-5 p-5 "
        >
          <div className="flex items-center  gap-x-4">
            <BookRent width={40} height={40} fill={"#00ABFF"} />
            <p className="text-xl">Book Rent</p>
          </div>
          <p className="">{isSignUp ? "Sign Up as Owner" : "Login"}</p>
          <TextField
            id="outlined-basic"
            label="Email address"
            variant="outlined"
            type="email"
            size="small"
            name="email"
            className="w-96 "
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            size="small"
            className="w-96"
          />
          {isSignUp && (
            <>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                size="small"
                name="confirmPassword"
                helperText={isSignUp ? registerErrorMessage : authErrorMessage}
                className="w-96 "
              />
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                size="small"
                name="location"
                className="w-96"
              />
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                size="small"
                name="name"
                className="w-96"
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                size="small"
                type="number"
                name="phoneNumber"
                className="w-96"
              />
            </>
          )}
          <p className="text-red-500">
            {authErrorMessage || registerErrorMessage}
          </p>
          <input type="text" name="role" value="owner" className="hidden" />
          <FormControlLabel
            control={
              <Checkbox
                value={agreement}
                onChange={({ target }) => {
                  setAgreement(target.checked);
                }}
              />
            }
            name={isSignUp ? undefined : "remember"}
            label={
              isSignUp ? "I accept the terms and conditions" : "Remember Me"
            }
          />
          <Button
            variant="contained"
            type="submit"
            disabled={
              isSignUp ? !!registerIsPending || !agreement : !!authIsPending
            }
            className="bg-[#00ABFF]"
          >
            {isSignUp ? "Sign Up" : "login"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-x-4">
          <span>
            {isSignUp ? "Already have an account?" : "Have not an account?"}
          </span>{" "}
          <Button
            variant="text"
            className="text-[#00ABFF]"
            onClick={() => {
              setIsSignUp((prev) => !prev);
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
}
