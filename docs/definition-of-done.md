# Definition of Done (DoD)

Ett issue anses vara klart när följande kriterier uppfylls:

## Funktionellt
- Funktionaliteten implementerad enligt issue-beskrivning
- Acceptanskriterier uppfyllda
- Alla edge cases hanteras

## Kod & Kvalitet
- TypeScript används konsekvent
- ESLint / Prettier inga fel
- Ingen hårdkodad data som inte ska vara hårdkodad
- Variabler och funktioner namngivna tydligt
  
## Testning
 - Manuella tester genomförda
 - Enhetstester eller integrationstester för kritiska funktioner (om möjligt)
 - Mock data för testscenarier fungerar
   
## Dokumentation
- Uppdaterad README eller dokumentation om relevant
- Kommentarer i koden där logik är komplex
- Eventuella designbeslut dokumenterade i /docs
  
## Git / Repo
- Commit-meddelanden beskrivande och på engelska (eller teamstandard)
- Feature-branch ej mer än 1 issue bred
- Branch merged från develop innan PR
