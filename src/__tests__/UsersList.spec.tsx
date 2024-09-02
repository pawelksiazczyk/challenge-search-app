import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersList from "../components/UserList";
import { describe, expect, it, vi } from "vitest";

const queryClient = new QueryClient();

vi.mock("../hooks/users/useGetUsers", () => ({
  useGetUsers: () => ({
    data: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ],
    error: null,
    isLoading: false,
  }),
}));

describe("UsersList", () => {
  it("renders correctly when data is loading", () => {
    vi.mock("../hooks/users/useGetUsers", () => ({
      useGetUsers: () => ({
        data: null,
        error: null,
        isLoading: true,
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="" />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("displays an error message when data fetching fails", () => {
    vi.mock("../hooks/users/useGetUsers", () => ({
      useGetUsers: () => ({
        data: null,
        error: { message: "Failed to fetch" },
        isLoading: false,
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="" />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it("filters and displays users based on the search query", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="Jane" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
      expect(screen.queryByText(/John Doe/i)).toBeNull();
    });
  });
});
