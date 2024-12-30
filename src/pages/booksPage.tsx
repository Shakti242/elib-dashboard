/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getBooks, deleteBook } from '@/http/api';
import useTokenStore from '@/store';
import { Book } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const BooksPage = () => {
  // const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State to store the selected book
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [editedBook, setEditedBook] = useState<Book | null>(null); // State to store the book being edited



  const queryClient = useQueryClient();

  // Fetch books data
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 10000, // in milliseconds
  });

  // Mutation for deleting a book
  const { mutate: deleteBookMutate } = useMutation({
    mutationFn: (bookId: string) => {
      const token = useTokenStore.getState().token;
      if (!token) {
        throw new Error('Token is missing. Please log in again.');
      }
      return deleteBook(bookId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      alert('Book deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Failed to delete book:', error.response?.data || error.message);
      alert(`Failed to delete the book: ${error.response?.data?.message || error.message}`);
    },
  });

  // Function to handle deleting a book
  const handleDelete = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutate(bookId);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // Function to handle the "Edit" button click
  const handleEditClick = (book: Book) => {
    setEditedBook(book); // Set the book to be edited
    setIsDialogOpen(true); // Open the dialog
  };

  // Handle the dialog save
  const handleSave = () => {
    if (editedBook) {
      // Handle the save functionality here (e.g., update the book in the database)
      console.log('Saving book:', editedBook);
      setIsDialogOpen(false); // Close the dialog
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to="/dashboard/books/create">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add book</span>
          </Button>
        </Link>
      </div>

      {/* Dialog for editing a book */}
      {editedBook && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            {/* Invisible button to trigger the dialog */}
            <Button aria-label="Edit" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Book</AlertDialogTitle>
              <AlertDialogDescription>
                Update the details of the book.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue={editedBook.title}
                  onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  defaultValue={editedBook.genre}
                  onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="createdAt">Created At</Label>
                <Input
                  id="createdAt"
                  defaultValue={editedBook.createdAt}
                  onChange={(e) => setEditedBook({ ...editedBook, createdAt: e.target.value })}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Manage your books and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="hidden md:table-cell">Author name</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: Book) => (
                <TableRow key={book._id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt={book.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={book.coverImage}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{book.genre}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.author?.name || 'Unknown Author'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.createdAt || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleDelete(book._id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button aria-haspopup="true" size="icon" variant="ghost" onClick={() => handleEditClick(book)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BooksPage;
