import "@testing-library/jest-dom"; 
import { TextEncoder, TextDecoder } from "util";
import fetchMock from "jest-fetch-mock"; 

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Enable fetch mocks globally
fetchMock.enableMocks(); 
