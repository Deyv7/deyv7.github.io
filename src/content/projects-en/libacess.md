---
title: Libacess
summary: A Python accessibility tool that converts text and speech into Brazilian Sign Language fingerspelling, displaying the corresponding sign image one letter at a time.
category: [ia]
cover: ../../assets/projects/libacess/capa.png
gallery:
  - src: ../../assets/projects/libacess/capa.png
    alt: Libacess logo with the motto "hands that connect"
  - src: ../../assets/projects/libacess/sinal-letra-a.png
    alt: Illustration of the letter A sign in Brazilian Sign Language, displayed when converting text
role: Developer
period: 2025
status: concluido
private: false
stack:
  - { name: Python, role: "Application foundation" }
  - { name: Tkinter, role: "Desktop interface" }
  - { name: Pillow, role: "Displays the image for each letter in Brazilian Sign Language" }
  - { name: SpeechRecognition, role: "Speech-to-text conversion" }
links:
  repo: https://github.com/deyv7/Libacess
order: 5
---

## Problem

Communication between deaf people who use Brazilian Sign Language (LIBRAS) and hearing people who do not know it still usually depends on an interpreter. A simple tool can help bridge the gap by displaying signs from typed or spoken text.

## Solution

A Python desktop application with a Tkinter interface:

- the user types text or speaks into a microphone;
- SpeechRecognition converts audio to text;
- the system displays the corresponding LIBRAS sign image one letter at a time, preserving spaces between words;
- the interface (`interface.py`) is separate from the main logic (`main.py`).

## Next steps

A second version, still at the prototype stage, is planned to do the reverse: recognize signs through the camera and convert them into text and speech.
