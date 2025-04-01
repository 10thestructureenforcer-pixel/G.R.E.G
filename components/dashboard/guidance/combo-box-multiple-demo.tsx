"use client";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const visaCategories = [
  // Core Tier (🥇)
  { label: "H-1B", value: "H-1B", tier: "core" },
  { label: "F-1", value: "F-1", tier: "core" },
  { label: "B-1/B-2", value: "B-1/B-2", tier: "core" },
  { label: "EB-2", value: "EB-2", tier: "core" },
  { label: "EB-2 NIW", value: "EB-2 NIW", tier: "core" },
  { label: "O-1", value: "O-1", tier: "core" },
  { label: "EB-3", value: "EB-3", tier: "core" },
  { label: "IR/CR", value: "IR/CR", tier: "core" },
  { label: "EB-5", value: "EB-5", tier: "core" },
  { label: "Asylum", value: "Asylum", tier: "core" },

  //   // Next Tier (🥈)
  //   { label: "L-1", value: "l1", tier: "next" },
  //   { label: "TN", value: "tn", tier: "next" },
  //   { label: "K-1", value: "k1", tier: "next" },
  //   { label: "U visa", value: "u-visa", tier: "next" },
  //   { label: "T visa", value: "t-visa", tier: "next" },
  //   { label: "R-1", value: "r1", tier: "next" },
  //   { label: "J-1", value: "j1", tier: "next" },

  //   // Later Tier (🥉)
  //   { label: "EB-1", value: "eb1", tier: "later" },
  //   { label: "EB-4", value: "eb4", tier: "later" },
  //   { label: "DV Lottery", value: "dv-lottery", tier: "later" },
];

interface ComboboxMultipleDemoProps {
  selectedVisas: string[];
  onVisasChange: (visas: string[]) => void;
}

export function ComboboxMultipleDemo({
  selectedVisas,
  onVisasChange,
}: ComboboxMultipleDemoProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-muted-foreground">
        Select Visa Categories
      </label>
      <Combobox
        value={selectedVisas}
        onValueChange={onVisasChange}
        className="w-full"
        multiple
        autoHighlight
      >
        <ComboboxAnchor className="h-10 flex items-center px-3 py-2 w-full border rounded-md">
          <ComboboxBadgeList className="flex flex-wrap gap-1 max-h-[24px] overflow-hidden">
            {selectedVisas.map((item) => {
              const option = visaCategories.find((visa) => visa.value === item);
              if (!option) return null;

              return (
                <ComboboxBadgeItem key={item} value={item} className="text-xs">
                  {option.label}
                </ComboboxBadgeItem>
              );
            })}
          </ComboboxBadgeList>
          <ComboboxInput
            placeholder="Select visa categories..."
            className="h-8 min-w-20 flex-1 text-sm bg-transparent"
          />
          <ComboboxTrigger className="absolute top-2 right-2">
            <ChevronDown className="h-4 w-4" />
          </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxContent className="w-[var(--radix-combobox-trigger-width)] max-w-[400px]">
          <ComboboxEmpty>No visa categories found.</ComboboxEmpty>
          {visaCategories.map((visa) => (
            <ComboboxItem
              key={visa.value}
              value={visa.value}
              className="text-sm"
            >
              {visa.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
