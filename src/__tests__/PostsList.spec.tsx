import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsList from "../components/PostsList";
import { describe, expect, it, vi } from "vitest";

const queryClient = new QueryClient();

vi.mock("../hooks/posts/useGetPosts", () => ({
  useGetPosts: () => ({
    data: [
      { id: 1, title: "Post One" },
      { id: 2, title: "Post Two" },
    ],
    error: null,
    isLoading: false,
  }),
}));

describe("PostsList", () => {
  it("renders correctly when data is loading", () => {
    vi.mock("../hooks/posts/useGetPosts", () => ({
      useGetPosts: () => ({
        data: null,
        error: null,
        isLoading: true,
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="" />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("displays an error message when data fetching fails", () => {
    vi.mock("../hooks/posts/useGetPosts", () => ({
      useGetPosts: () => ({
        data: null,
        error: { message: "Failed to fetch" },
        isLoading: false,
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="" />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it("filters and displays posts based on the search query", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="Two" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Post Two/i)).toBeInTheDocument();
      expect(screen.queryByText(/Post One/i)).toBeNull();
    });
  });
});
