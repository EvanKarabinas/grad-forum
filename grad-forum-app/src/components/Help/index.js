import React, { Component } from "react";
import "./help.css";
import screenSend from "../../screen-send.png";
import screenCreate from "../../screen-create.png";
import notifications from "../../notifications.png";
import profile from "../../profile.png";
import logout from "../../logout.png";
import comment from "../../comment.png";
import send from "../../send-black.png";

class Help extends Component {
  state = {
    content: "",
    active: "createAcc"
  };

  componentDidMount() {
    this.showCreateAcc();
  }

  showCreateAcc = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πως δημιουργώ λογαριασμό στο φόρουμ;{" "}
        </span>
        <p>
          Για να δημιουργήσεις ένα λογαριασμό στο GradForum:
          <ol type="1">
            <li>Πατήστε στο κουμπί “Γίνε μέλος”.</li>
            <li>
              Γράψτε τη διεύθυνση email σας, το όνομά σας, το επίθετό σας και
              δημιουργήστε ένα όνομα χρήστη και κωδικό πρόσβασης.
            </li>
            <li> Πατήστε Εγγραφή.</li>
          </ol>
          Θα πρέπει να βεβαιωθείτε ότι έχετε γράψει σωστά τη διεύθυνση email
          σας, καθώς και να επιλέξετε μια διεύθυνση email στην οποία έχετε
          πρόσβαση μόνο εσείς.
        </p>
        <span className="help-subtitles">
          {" "}
          Πως συνδέομαι με το λογαριασμό μου στο φόρουμ;
        </span>
        <p>
          Για να συνδεθείτε στο GradForum θα πρέπει πρώτα να έχετε εγκριθεί από
          το διαχειρηστή.
          <ol type="1">
            <li> Πατήστε στο κουμπί “Είσοδος”. </li>
            <li>
              {" "}
              Εισάγετε στα πεδία “Όνομα χρήστη”,”Κωδικός πρόσβασης” το όνομα
              χρήστη και τον κωδικό πρόσβασης αντίστοιχα, που επιλέξατε κατά την
              εγγραφή στο φόρουμ.
            </li>
            <li>Πατήστε Είσοδος.</li>
          </ol>
          <p>
            Αν μετά το πάτημα του κουμπιού “Είσοδος”, δεν συνδέεστε και
            εμφανίζει μήνυμα “ Σφάλμα σύνδεσης: Ο λογαριασμός σας δεν έχει
            επιβεβαιωθεί ακόμα από το διαχειριστή”. Θα πρέπει να περιμένετε
            μέχρι να γίνει έγκριση του λογαριασμού σας από το διαχειριστή και να
            δοκιμάσετε ξανά αργότερα.
          </p>
          <p>
            Αν μετά το πάτημα του κουμπιού “Είσοδος”, δεν συνδέεστε και
            εμφανίζει μήνυμα “Σφάλμα σύνδεσης: “ Σφάλμα σύνδεσης:Το όνομα χρήστη
            ή ο κωδικός πρόσβασης είναι λάθος”, τότε το όνομα χρήστη ή ο κωδικός
            σύνδεσης είναι λάθος. Δοκιμάστε να ξανασυνδεθείτε συμπληρώνοντας τα
            αντίστοιχα πεδία με τα σωστά στοιχεία που καταχωρήσατε κατά την
            εγγραφή σας.
          </p>
        </p>
        <span className="help-subtitles">
          Πόσο χρειάζεται να περιμένω μέχρι να εγκριθεί ο λογαριασμός μου;
        </span>
        <p>
          Για να συνδεθείτε στο GradForum θα πρέπει πρώτα να έχετε εγκριθεί από
          το διαχειρηστή. Αν ο λογαριασμός σας αργήσει να εγκριθεί μην
          ανησυχήσετε. Ο χρόνος αυτός εξαρτάται από τον διαχειριστή. Μπορεί να
          πάρει από μερικά λεπτά ως και κάποιες ωρες ( σπάνια πάνω από 24 ώρες).
        </p>
        <span className="help-subtitles">
          Μπορώ να συνδεθώ με το λογαριασμό μου χωρίς να έχει γίνει έγκριση από
          το διαχειριστη;
        </span>
        <p>
          Όχι, για να συνδεθείτε στο GradForum θα πρέπει πρώτα να έχετε εγκριθεί
          από το διαχειρηστή.
        </p>
        <span className="help-subtitles">
          Προσπαθώ να συνδεθώ και μου εμφανίζει: “Σφάλμα σύνδεσης: Ο λογαριασμός
          σας δεν έχει επιβεβαιωθεί ακόμα από το διαχειριστή”. Τι σημαίνει αυτό;
        </span>
        <p>
          Θα πρέπει να περιμένετε μέχρι να γίνει έγκριση του λογαριασμού σας από
          το διαχειριστή του GradForum και να δοκιμάσετε να συνδεθείτε με τα
          στοιχεία σας αργότερα.
        </p>
      </div>
    );
    this.setState({ content: content, active: "createAcc" });
  };

  showEditProfile = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          {" "}
          Πού βρίσκονται οι ρυθμίσεις του λογαριαμού μου;
        </span>
        <p>
          Πατήστε στο εικονίδιο <img className="help-icons" src={profile} /> που
          βρίσκεται στο πάνω μέρος της κύριας σελίδας. Από εκεί μπορείτε να
          κάνετε τα εξής:
          <p>Αλλαγή Ονόματος</p>
          <p>Αλλαγή Επιθέτου</p>
          <p>Αλλαγή διεύθυνσης email</p>
          <p>Αλλαγή Εικόνας προφίλ</p>
          <p>Αλλαγή Κωδικού πρόσβασης</p>
        </p>
        <span className="help-subtitles">
          {" "}
          Πώς μπορώ να ενημερώσω τις πληροφορίες του προφίλ μου στο Instagram,
          όπως το όνομά μου, το όνομά μου, το επίθετό μου ή το email μου;
        </span>
        <p>
          Για να ενημερώσετε τις πληροφορίες του προφίλ σας, συμπεριλαμβανομένου
          του ονόματός σας, του επίθετού σας και της διεύθυνσης email που
          σχετίζονται με το λογαριασμό σας:
          <ol type="1">
            <li>
              Πατήστε στο εικονίδιο <img className="help-icons" src={profile} />
            </li>
            <li>
              Αλλάξτε τα στοιχεία που επιθυμείτε, συμπληρώνοντας τις πληροφορίες
              που θέλετε.
            </li>
            <li>Πατήστε “Αποθήκευση”.</li>
          </ol>
          Για να ενημερώσετε τις πληροφορίες του προφίλ σας, πρέπει πρώτα να
          είστε συνδεδεμένοι στο λογαριασμό σας.
        </p>
        <span className="help-subtitles">
          {" "}
          Πως μπορώ να αλλάξω κωδικό πρόσβασης;
        </span>
        <p>
          <ol type="1">
            <li>
              Πατήστε στο εικονίδιο <img className="help-icons" src={profile} />
            </li>
            <li>
              Εισάγετε τον τρέχοντα κωδικό πρόσβασης και έπειτα πληκτρολογήστε
              τον νέο στο αντίστοιχο πεδίο.
            </li>
            <li>Πατήστε “Αποθήκευση”.</li>
          </ol>
          Συμβουλή: Για να δημιουργήσετε έναν ισχυρό κωδικό πρόσβασης,
          χρησιμοποιήστε τουλάχιστον 6 χαρακτήρες, συνδυάζοντας αριθμούς,
          γράμματα και σημεία στίξης (π.χ. ! και %).
        </p>
        <span className="help-subtitles">
          {" "}
          Μπορώ να προσθέσω ή να αλλάξω την εικόνα προφίλ που έχω;
        </span>
        <p>
          Φυσικα. Για να προσθέσετε ή να αλλάξετε την εικόνα προφίλ σας:
          <ol type="1">
            <li>
              Πατήστε στο εικονίδιο <img className="help-icons" src={profile} />
            </li>
            <li>
              Πατήστε “Αλλαγή εικόνα προφίλ” και επιλέξτε μια φωτογραφία από τον
              υπολογιστή σας.
            </li>
            <li>Πατήστε “Αποθήκευση”.</li>
          </ol>
        </p>
        Αν κάνατε κάποιο λάθος ή δεν επιθυμείτε να αλλάξετε κάποιο από τα
        στοιχεία σας, πατήστε “Ακύρωση”.
      </div>
    );
    this.setState({ content: content, active: "editProfile" });
  };

  showNotifications = () => {
    var content = (
      <div>
        <span className="help-subtitles">Πότε μου έρχονται ειδοποιήσεις;</span>
        <p>
          Ειδοποιήσεις λαμβάνετε όταν:
          <p>ένας χρήστης δημοσιεύει μία ανάρτηση,</p>
          <p>ένας χρήστης δημιουργεί μία νέα ομάδα,</p>
          <p>ένας χρήστης δημοσιεύει μία αγγελία,</p>
          <p>ένας χρήστης προσθέτει μια εκδήλωση,</p>
          <p>ένας χρήστης σχολιάζει μια ανάρτηση που έχετε δημοσιεύσει,</p>
          <p>ένας χρήστης σχολιάζει μια αγγελία που έχετε δημοσιεύσει,</p>
          <p>ένας χρήστης σχολιάζει μία εκδήλωση που έχετε προσθέσει,</p>
          <p>
            ένας χρήστης έχει δηλώσει ότι του αρέσει μια ανάρτηση που έχετε
            δημοσιεύσει.
          </p>
        </p>
        <span className="help-subtitles">
          Πως μπορώ να δω τις ειδοποιήσεις μου:
        </span>
        <p>
          Για να δείτε τις ειδοποιήσεις σας πατήστε στο εικονίδιο{" "}
          <img className="help-icons" src={notifications} />
          επάνω
        </p>
      </div>
    );
    this.setState({ content: content, active: "notifications" });
  };

  showLogout = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πώς μπορώ να αποσυνδεθώ από το GradForum;
        </span>
        <p>
          {" "}
          Μπορείτε να αποσυνδεθείτε από το GradForum πατώντας το εικονίδιο πάνω
          <img className="help-icons" src={logout} />
        </p>
      </div>
    );
    this.setState({ content: content, active: "logout" });
  };

  showGroups = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Σε πόσες ομάδες του GradForum μπορώ να γίνω μέλος;
        </span>
        <p>Μπορείτε να γίνετε μέλος σε όσες ομάδες επιθυμείτε.</p>
        <span className="help-subtitles">
          Πώς μπορώ να δω τη λίστα των ομάδων μου;
        </span>
        <p>
          Οι ομάδες στις οποίες είστε μέλος υπάρχουν στα δεξιά της σελίδας.
          Πατώντας στο όνομα μιας ομάδας εμφανίζεται pop-up παράθυρο με την
          αντίστοιχη ομάδα στην οποία είστε μέλος. Αν αποχωρήσετε από μια ομάδα,
          αφαιρείτε η συγκεκριμένη ομάδα από αυτή τη λίστα.
        </p>
        <span className="help-subtitles">
          Πώς μπορώ να δημιουργήσω μια ομάδα;
        </span>
        <p>
          Για να δημιουργήσετε μια ομάδα:
          <ol type="1">
            <li>Επιλέξτε απο το μενού στα αριστερα της σελίδας “Ομάδες”.</li>
            <li>
              Πατήστε το εικονίδιο{" "}
              <img className="help-icons" src={screenCreate} />
            </li>
            <li>
              Εμφανίζεται στο πανω μέρος μια φόρμα, την οποία συμπληρώνετε με τα
              στοιχεία που χρειάζονται και πατάτε το κουμπί{" "}
              <img className="help-icons" src={screenSend} /> για δημιουργία.
            </li>
          </ol>
          Δημιουργώντας μια ομάδα γίνεστε αυτόματα μέλος σε αυτή. Αν επιθυμείτε
          να αποχωρήσετε απο αυτή μπορείτε να το κάνετε οποιαδήποτε στιγμη
          θελήσετε.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να αποχωρήσω απο μία ομάδα;
        </span>
        <p>
          Για να αποχωρήσετε από μία ομάδα:
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Ομάδες” και
              πατήστε την ομάδα που θέλετε να αποχωρήσετε ή επιλέξτε την ομάδα
              από τη λίστα στα δεξιά με όλες τις ομάδες που είστε μέλος.
            </li>
            <li>
              Αφού εμφανιστεί το pop-up παράθυρο με την ομάδα πατήστε το κουμπί
              στα δεξια “Έξοδος”.
            </li>
          </ol>
        </p>

        <span className="help-subtitles">
          Μπορώ να γίνω μέλος σε μία ομάδα από την οποία έχω αποχωρήσει;
        </span>
        <p>
          Φυσικα. Μπορείς να γίνεις μέλος ή να αποχωρήσεις απο μία ομάδα όποτε
          επιθυμείς.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να γίνω μέλος σε μία ομάδα;
        </span>
        <p>
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Ομάδες” και
              πατήστε την ομάδα που θέλετε να γίνετε μέλος.
            </li>
            <li>
              Αφού εμφανιστεί το pop-up παράθυρο με την ομάδα πατήστε το κουμπί
              στα δεξια “Γίνε Μέλος”.
            </li>
          </ol>
        </p>
        <span className="help-subtitles">
          Μπορώ να σχολιάσω σε μία ομάδα που δεν είμαι μέλος;
        </span>
        <p>
          Όχι. Για να γράψεις κάποιο μήνυμα σε μια ομάδα πρέπει πρώτα να γίνεις
          μέλος σε αυτή.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να στείλω ένα μήνυμα σε μία ομάδα;
        </span>
        <p>
          Για να δημοσιεύσετε ένα μήνυμα σε μία ομάδα που είστε μέλος:
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Ομάδες” ή επιλέξτε
              την ομάδα από τη λίστα στα δεξιά με όλες τις ομάδες που είστε
              μέλος και πατήστε την ομάδα που θέλετε να γράψετε κάποιο μήνυμα.
            </li>
            <li>Γράψτε το μήνυμα σας στο κενό χώρο που υπάρχει.</li>
            <li>
              Πατήστε το κουμπί <img className="help-icons" src={send} /> για
              δημοσίευση μηνύματος.
            </li>
          </ol>
        </p>
        <span className="help-subtitles">
          Ποιος μπορεί να γίνει μέλος σε μία ομάδα;
        </span>
        <p>Όλα τα μέλη του GradForum μπορούν να γίνουν μέλη σε μία ομάδα.</p>
        <span className="help-subtitles">
          Ποιος μπορεί να διαβάσει τα μηνύματα που υπάρχουν σε μία ομάδα;
        </span>
        <p>
          Όλα τα μέλη του GradForum μπορούν να διαβάσουν τα μηνύματα κάθε
          ομάδας. Ωστόσω για να συμμετάσχει κάποιος στη συζήτηση και να στείλει
          κάποιο μήνυμα θα πρέπει να γίνει πρώτα μέλος στην ομάδα.
        </p>
      </div>
    );
    this.setState({ content: content, active: "groups" });
  };

  showPosts = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πώς μπορώ να δημοσιεύσω μια ανάρτηση;
        </span>
        <p>
          Για να δημιουργήσετε μια ανάρτηση:
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Αναρτήσεις”.
            </li>
            <li>
              Πατήστε το εικονίδιο{" "}
              <img className="help-icons" src={screenCreate} /> .
            </li>
            <li>
              Εμφανίζεται στο πανω μέρος μια φόρμα, την οποία συμπληρώνετε με τα
              στοιχεία που χρειάζονται και πατάτε το κουμπί{" "}
              <img className="help-icons" src={screenSend} /> για δημοσίευση.
            </li>
          </ol>
        </p>
        <span className="help-subtitles">
          Πως μπορώ να σχολιάσω μία ανάρτηση;
        </span>
        <p>
          Για να σχολιάσετε μια ανάρτηση γράψτε το σχόλιο σας στον χώρο που
          υπάρχει κάτω από την ανάρτηση και πατήστε “Δημοσίευση”.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να δηλώσω ότι μου αρέσει μία ανάρτηση;
        </span>
        <p>
          Για να δηλώσετε ότι σας αρέσει μια ανάρτηση πατήστε την καρδούλα στα
          αριστερά της ανάρτησης.
          <p>
            Για να <span className="help-subtitles">αφαιρέσετε το like</span>{" "}
            πατήστε άλλη μια φορά στην καρδιά.
          </p>
        </p>
        <span className="help-subtitles">
          Ποιος βλέπει τα σχόλια μου κάτω από μία ανάρτηση;
        </span>
        <p>
          Όλα τα μέλη του GradForum μπορούν να διαβάσουν και να προσθέσουν
          σχόλια κάτω από μία ανάρτηση.
        </p>
      </div>
    );
    this.setState({ content: content, active: "posts" });
  };

  showJobOffers = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πώς μπορώ να δημοσιεύσω μια αγγελία;
        </span>
        <p>
          Για να δημιουργήσετε μια αγγελία:
          <ol type="1">
            <li>Επιλέξτε απο το μενού στα αριστερα της σελίδας “Αγγελίες”.</li>
            <li>
              Πατήστε το εικονίδιο{" "}
              <img className="help-icons" src={screenCreate} /> .
            </li>
            <li>
              Εμφανίζεται στο πανω μέρος μια φόρμα, την οποία συμπληρώνετε με τα
              στοιχεία που χρειάζονται και πατάτε το κουμπί{" "}
              <img className="help-icons" src={screenSend} /> για δημοσίευση.
            </li>
          </ol>
          Μην ξεχάσετε: Στη φόρμα συμπλήρωσης για τις αγγελίες είναι
          προεπιλεμένη η επιλογή προσφορά εργασίας. Αν η αγγελία που θα
          αναρτήσετε αφορά ζήτηση εργασίας τότε επιλέξτε την αντίστοιχη επιλογή
          “Ζήτηση”.
        </p>

        <span className="help-subtitles">
          Πως μπορώ να σχολιάσω μία αγγελία;
        </span>
        <p>
          Για να σχολιάσετε μια αγγελία γράψτε το σχόλιο σας στον χώρο που
          υπάρχει κάτω από την αγγελία και πατήστε “Δημοσίευση”.
        </p>
        <span className="help-subtitles">
          Ποιος βλέπει τα σχόλια μου κάτω από μία αγγελία;
        </span>
        <p>
          Όλα τα μέλη του GradForum μπορούν να διαβάσουν και να προσθέσουν
          σχόλια κάτω από μία αγγελία.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να καταλάβω εύκολα αν πρόκειται για προσφορά ή ζήτηση
          εργασίας;
        </span>
        <p>
          Σε κάθε αγγελία αναγράφεται στο πάνω δεξί μέρος της αν πρόκειται για
          προσφορά εργασίας (αν κάποια πχ εταιρία έχει κάποια ανοιχτή θέση
          εργασιάς) ή ζήτηση εργσίας (αν πχ κάποιος ψάχνει για μια συγκεκριμένη
          θέση εργασίας).
        </p>
      </div>
    );
    this.setState({ content: content, active: "jobOffers" });
  };

  showEvents = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πώς μπορώ να προσθέσω μια εκδήλωση;
        </span>
        <p>
          Για να προσθέσετε μια εκδήλωση:
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Εκδηλώσεις”.
            </li>
            <li>
              Πατήστε το εικονίδιο{" "}
              <img className="help-icons" src={screenCreate} /> .
            </li>
            <li>
              Εμφανίζεται στο πανω μέρος μια φόρμα, την οποία συμπληρώνετε με τα
              στοιχεία που χρειάζονται και πατάτε το κουμπί{" "}
              <img className="help-icons" src={screenSend} /> για δημοσίευση.
            </li>
          </ol>
        </p>
        <span className="help-subtitles">
          Πως μπορώ να δηλώσω οτι θα πάω σε μια εκδήλωση;
        </span>
        <p>
          Για να δηλώσετε οτι θα παρευρεθείτε σε μία εκδήλωση:
          <ol type="1">
            <li>
              Επιλέξτε απο το μενού στα αριστερα της σελίδας “Εκδηλώσεις”.
            </li>
            <li>
              Πατήστε το κουμπί “θα πάω” στην εκδήλωση που σας ενδιαφέρει.
            </li>
          </ol>
          Για να καταργήσετε αυτή την επιλογή πατήστε πάνω στο κουμπι “έχετε
          δηλώσει οτι θα πάτε”.
        </p>
        <span className="help-subtitles">
          Πως μπορώ να σχολιάσω μία εκδήλωση;
        </span>
        <p>
          Για να σχολιάσετε μια εκδήλωση γράψτε το σχόλιο σας στον χώρο που
          υπάρχει κάτω από την αγγελία και πατήστε “Δημοσίευση”.
        </p>
        <span className="help-subtitles">
          Ποιος βλέπει τα σχόλια μου κάτω από μία εκδήλωση;
        </span>
        <p>
          Όλα τα μέλη του GradForum μπορούν να διαβάσουν και να προσθέσουν
          σχόλια κάτω από μία εκδήλωση.
        </p>
      </div>
    );
    this.setState({ content: content, active: "events" });
  };

  showMembers = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Πως μπορώ να δω τα μέλη του GradForum;
        </span>
        <p>
          Για να δείτε τα μέλη του φόρουμ πατήστε από το αριστερό μενού το
          κουμπί “Μέλη”.
        </p>
      </div>
    );
    this.setState({ content: content, active: "members" });
  };

  showSecurity = () => {
    var content = (
      <div>
        <span className="help-subtitles">
          Δείτε τι μπορείτε να κάνετε για να διατηρείτε το λογαριασμό σας
          ασφαλή:
        </span>
        <p>
          Επιλέξτε έναν ισχυρό κωδικό πρόσβασης. Χρησιμοποιήστε τουλάχιστον έξι
          χαρακτήρες, συνδυάζοντας αριθμούς, γράμματα και σημεία στίξης (π.χ. !
          και ?). Πρέπει να είναι διαφορετικός από τους υπόλοιπους κωδικούς
          πρόσβασης που χρησιμοποιείτε στο διαδίκτυο.
        </p>
        <p>
          Μην δίνετε ποτέ τον κωδικό σας σε κανέναν που δεν γνωρίζετε και δεν
          εμπιστεύεστε.
        </p>
        <p>
          Όταν χρησιμοποιείτε κοινόχρηστο υπολογιστή ή κοινόχρηστη συσκευή, να
          αποσυνδέεστε πάντα από το GradForum.
        </p>
      </div>
    );
    this.setState({ content: content, active: "security" });
  };

  render() {
    return (
      <div className="help-container">
        <div className="help-left-column">
          <button className="help-exit-button" onClick={this.props.closePopUp}>
            x
          </button>
          <p className="help-window-title">Βοήθεια</p>
          {this.state.active === "createAcc" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showCreateAcc}
            >
              Δημιουργία λογαριασμού/Είσοδος
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showCreateAcc}
            >
              Δημιουργία λογαριασμού/Είσοδος
            </button>
          )}
          {this.state.active === "editProfile" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showEditProfile}
            >
              Επεξεργασία Προφίλ
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showEditProfile}
            >
              Επεξεργασία Προφίλ
            </button>
          )}
          {this.state.active === "notifications" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showNotifications}
            >
              Ειδοποιήσεις
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showNotifications}
            >
              Ειδοποιήσεις
            </button>
          )}
          {this.state.active === "logout" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showLogout}
            >
              Αποσύνδεση
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showLogout}
            >
              Αποσύνδεση
            </button>
          )}
          {this.state.active === "groups" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showGroups}
            >
              Ομάδες
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showGroups}
            >
              Ομάδες
            </button>
          )}
          {this.state.active === "posts" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showPosts}
            >
              Αναρτήσεις
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showPosts}
            >
              Αναρτήσεις
            </button>
          )}
          {this.state.active === "events" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showEvents}
            >
              Εκδηλώσεις
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showEvents}
            >
              Εκδηλώσεις
            </button>
          )}
          {this.state.active === "jobOffers" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showJobOffers}
            >
              Αγγελίες
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showJobOffers}
            >
              Αγγελίες
            </button>
          )}
          {this.state.active === "members" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showMembers}
            >
              Μέλη
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showMembers}
            >
              Μέλη
            </button>
          )}
          {this.state.active === "security" ? (
            <button
              className="help-left-column-button-active"
              onClick={this.showSecurity}
            >
              Συμβουλές για την ασφάλεια
            </button>
          ) : (
            <button
              className="help-left-column-button"
              onClick={this.showSecurity}
            >
              Συμβουλές για την ασφάλεια
            </button>
          )}
        </div>

        <div className="help-right-column">
          <div className="help-right-column-content">{this.state.content}</div>
        </div>
      </div>
    );
  }
}

export default Help;
