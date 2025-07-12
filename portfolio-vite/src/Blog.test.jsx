import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Blog from './Blog.jsx';

// Ensure fetch is defined in the test environment
globalThis.fetch = jest.fn();

describe('Blog Component', () => {
    beforeEach(() => {
        globalThis.fetch.mockClear();
    });

    test('renders blog posts after fetch', async () => {
        globalThis.fetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve([
                    {
                        id: 1,
                        title: 'Test Post',
                        excerpt: 'Test excerpt',
                        content: 'Test content',
                        date: 'July 7, 2025',
                        image: 'test.jpg'
                    }
                ])
        });

        render(<Blog />);
        expect(await screen.findByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test excerpt')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Test Post' })).toBeInTheDocument();
    });

    test('filters posts on search', async () => {
        globalThis.fetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve([
                    {
                        id: 1,
                        title: 'Test Post',
                        excerpt: 'Test excerpt',
                        content: 'Test content',
                        date: 'July 7, 2025',
                        image: 'test.jpg'
                    }
                ])
        });

        render(<Blog />);
        await waitFor(() => screen.getByText('Test Post'));
        const input = screen.getByLabelText('Search blog posts');
        fireEvent.change(input, { target: { value: 'Test' } });
        expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    test('shows no posts found for invalid search', async () => {
        globalThis.fetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve([
                    {
                        id: 1,
                        title: 'Test Post',
                        excerpt: 'Test excerpt',
                        content: 'Test content',
                        date: 'July 7, 2025',
                        image: 'test.jpg'
                    }
                ])
        });

        render(<Blog />);
        await waitFor(() => screen.getByText('Test Post'));
        const input = screen.getByLabelText('Search blog posts');
        fireEvent.change(input, { target: { value: 'Invalid' } });
        expect(screen.getByText('No posts found')).toBeInTheDocument();
    });

    test('displays error on fetch failure', async () => {
        globalThis.fetch.mockRejectedValue(new Error('Failed to fetch posts'));
        render(<Blog />);
        expect(await screen.findByText('Error: Failed to fetch posts')).toBeInTheDocument();
    });
});