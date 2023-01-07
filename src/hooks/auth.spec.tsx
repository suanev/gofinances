import { renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import { mocked } from "jest-mock";

import { AuthProvider, useAuth } from "./auth";

fetchMock.enableMocks();

jest.mock("expo-auth-session");

describe("Auth hook", () => {
  it("should be able to sign in with a existing Google account", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "rodrigo.goncalves@rocketseat.team",
        name: "Rodrigo",
        photo: "any_photo.png",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signInWithGoogle();

    await waitForNextUpdate();

    expect(result.current.user).toBeTruthy();
  });

  it("user should not sign in if cancel authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signInWithGoogle();

    await waitForNextUpdate();

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error when return with incorrect Google params", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      result.current.signInWithGoogle();

      await waitForNextUpdate();
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
