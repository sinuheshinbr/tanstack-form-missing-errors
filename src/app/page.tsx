"use client";

/* eslint-disable react/no-children-prop */
import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";

export default function HomePage() {
  const [show, setShow] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      createCondo: {
        address: {
          zipcode: "",
        },
      },
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  const fieldValues = useStore(
    form.store,
    (formState) => formState.fieldMeta["createCondo.address.zipcode"],
  );

  function handleUpdateMeta() {
    form.setFieldValue("createCondo.address.zipcode", "04564-000");
  }

  return (
    <div className="flex h-dvh w-dvw bg-emerald-50">
      <div className="flex w-full max-w-screen-sm flex-col items-center justify-center gap-5 rounded-lg bg-white p-12 shadow-lg">
        <h1 className="text-2xl font-medium">
          Testing Tanstack&apos;s form setFieldValue
        </h1>

        <h2 className="text-center">
          Using setFieldValue without dontUpdateMeta: true in a field that has
          not being initialized create fieldMeta missing errors
        </h2>

        <h2 className="text-center">
          If you try to show the element afterwards it breaks because it tries
          to read length of undefined
        </h2>

        <span>Click the button below to setFieldValue:</span>

        <div className="flex gap-2">
          <button
            onClick={handleUpdateMeta}
            className="h-12 rounded-lg border px-4"
          >
            setFieldValue
          </button>

          <button
            onClick={() => setShow((s) => !s)}
            className="h-12 rounded-lg border px-4"
          >
            Show
          </button>
        </div>

        <form
          className="mt-20 flex w-full flex-col gap-8"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4">
            <form.Field
              name="fullName"
              validators={{
                onChange: ({ value }) => (!value ? "Obrigatório" : undefined),
              }}
              children={(field) => (
                <label>
                  <span className="font-medium">Full Name</span>
                  <input
                    className="h-12 w-full rounded-lg border px-4 text-gray-600"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="bg-red-50 p-2 text-sm font-medium text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </label>
              )}
            />

            {show && (
              <form.Field
                name="createCondo.address.zipcode"
                validators={{
                  onChange: ({ value }) => (!value ? "Obrigatório" : undefined),
                }}
                children={(field) => (
                  <label>
                    <span className="font-medium">Zipcode</span>
                    <input
                      className="h-12 w-full rounded-lg border px-4 text-gray-600"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <div className="bg-red-50 p-2 text-sm font-medium text-red-500">
                        {field.state.meta.errors.join(", ")}
                      </div>
                    )}
                  </label>
                )}
              />
            )}
          </div>
          <button
            className="h-12 rounded-lg bg-blue-900 text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex h-full w-full items-center justify-center">
        <pre className="w-full max-w-80">
          {JSON.stringify(fieldValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}
